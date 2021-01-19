package api

import (
	"encoding/json"
	"fmt"

	"golang.org/x/net/websocket"
)

type Client struct {
	conn  *websocket.Conn
	lobby *Lobby
	send  chan Response
}

// ReadPump handles a Client's incoming messages
func (c *Client) ReadPump(allLobbies map[string]*Lobby, maxPlayers int) {
	defer func() {
		if c.lobby != nil {
			c.lobby.exit <- c
		}
		c.conn.Close()
	}()

	for {
		var p Payload
		var err error

		err = websocket.JSON.Receive(c.conn, &p)

		switch p.Action {
		case "create":
			create(c, allLobbies)
		case "join":
			err = join(c, p, allLobbies, maxPlayers)
		case "exit":
			if c.lobby != nil {
				c.lobby.exit <- c
			}
		case "chat":
			err = chat(c, p.Params)
		default:
			err = fmt.Errorf("unrecognised action %v", p.Action)
		}

		if err != nil {
			re := ResponseError{Message: err.Error()}
			b, _ := json.Marshal(re)
			c.send <- Response{
				Category: "error",
				Body:     b,
			}
		}
	}
}

func (c *Client) WritePump() {
	for {
		r := <-c.send
		websocket.JSON.Send(c.conn, r)
	}
}
