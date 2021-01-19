package api

import (
	"fmt"

	"golang.org/x/net/websocket"
)

type Client struct {
	conn  *websocket.Conn
	lobby *Lobby
	send  chan Response
	name  string
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
			create(c, p.Params, allLobbies)
		case "join":
			err = join(c, p.Params, allLobbies, maxPlayers)
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
			c.send <- mkErrorResponse(p.Action, err)
		}
	}
}

func (c *Client) WritePump() {
	for {
		r := <-c.send
		websocket.JSON.Send(c.conn, r)
	}
}
