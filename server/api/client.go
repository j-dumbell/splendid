package api

import (
	"encoding/json"
	"fmt"

	"golang.org/x/net/websocket"
)

type Response struct {
	Message string
}

type Client struct {
	conn  *websocket.Conn
	lobby *Lobby
	send  chan Response
}

type Payload struct {
	Action string          `json:"action"`
	Params json.RawMessage `json:"params"`
}

type Join struct {
	ID string `json:"id"`
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
			c.send <- Response{Message: err.Error()}
		}
	}
}

func (c *Client) WritePump() {
	fmt.Println("Starting Writepump")
	for {
		r := <-c.send
		fmt.Printf("Sending message: %v\n", r.Message)
		websocket.JSON.Send(c.conn, r)
		fmt.Printf("Sent message: %v\n", r.Message)
	}
}
