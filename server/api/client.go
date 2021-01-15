package api

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/util"
	"golang.org/x/net/websocket"
)

type Client struct {
	conn  *websocket.Conn
	Lobby *Lobby
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
			c.conn.Close()
			delete(c.Lobby.Clients, c)
		}
	}()

	for {
		var p Payload
		// TODO handle errors properly
		websocket.JSON.Receive(c.conn, &p)

		switch p.Action {
		case "create":
			lobby := NewLobby()
			go lobby.Run()
			lobbyID := util.RandID(6, time.Now().UnixNano())
			fmt.Printf("Created lobby %v with lobbyId %v\n", lobby, lobbyID)
			allLobbies[lobbyID] = &lobby
			lobby.Clients[c] = true
			c.Lobby = &lobby
			fmt.Printf("Client %v joined lobbyId %v\n", c, lobbyID)

		case "join":
			delete(c.Lobby.Clients, c)
			var j Join
			json.Unmarshal(p.Params, &j)
			lobby, exists := allLobbies[j.ID]
			if !exists {
				fmt.Printf("Lobby %v does not exist\n", j.ID)
			} else {
				lobby.Clients[c] = true
				c.Lobby = lobby
				fmt.Printf("Joined lobby %v\n", lobby)
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
