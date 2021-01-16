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

type Response struct {
	Category string			`json:"category"`
	Body json.RawMessage	`json:"body"`
}

type Payload struct {
	Action string          `json:"action"`
	Params json.RawMessage `json:"params"`
}

type Join struct {
	ID string `json:"id"`
}

type ResponseError struct {
	Message string		`json:"message"`
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
		default:
			if c.lobby != nil {
				c.lobby.broadcast <- p
			} else {
				err = fmt.Errorf("client %v not in any lobby", c)
			}
		}

		if err != nil {
			r := ResponseError{Message: err.Error()}
			b, _ := json.Marshal(r)
			c.send <- Response{
				Category: "error", 
				Body: b,
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
