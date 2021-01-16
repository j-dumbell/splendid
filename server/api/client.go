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
	Lobby *Lobby
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
func (c *Client) ReadPump(allLobbies map[string]*Lobby) {
	defer func() {
		if c.Lobby != nil {
			c.Lobby.exit <- c
		}
		c.conn.Close()
	}()

	for {
		var p Payload
		// TODO handle errors properly
		websocket.JSON.Receive(c.conn, &p)

		switch p.Action {
		case "create":
			lobby := NewLobby()
			fmt.Printf("Created lobby %v with lobbyId %v\n", lobby, lobby.id)
			go lobby.Run()
			lobby.join <- c

		case "join":
			if c.Lobby != nil {
				c.Lobby.exit <- c
			}
			var j Join
			json.Unmarshal(p.Params, &j)
			lobby, exists := allLobbies[j.ID]
			if !exists {
				fmt.Printf("Lobby %v does not exist\n", j.ID)
			} else {
				lobby.join <- c
			}
		case "exit":
			if c.Lobby != nil {
				c.Lobby.exit <- c
			}
		default:
			if c.Lobby != nil {
				c.Lobby.Broadcast <- p
			} else {
				fmt.Printf("Client %v not in any lobby\n", c)
			}
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
