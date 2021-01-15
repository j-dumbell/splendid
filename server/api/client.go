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
			delete(c.Lobby.Clients, c)
		}
	}()

	for {
		var p Payload
		err := websocket.JSON.Receive(c.conn, &p)

		if err != nil {
			fmt.Printf("ws read error: %v\n", err)
			break
		}

		switch p.Action {
		case "create":
			lobby := NewLobby()
			go lobby.Run()
			lobbyID := util.RandID(6, time.Now().UnixNano())
			allLobbies[lobbyID] = &lobby
			lobby.Clients[c] = true
			c.Lobby = &lobby
			fmt.Printf("created lobby %v\n", lobbyID)

		case "join":
			delete(c.Lobby.Clients, c)
			var j Join
			json.Unmarshal(p.Params, &j)
			lobby, exists := allLobbies[j.ID]
			if !exists {
				fmt.Printf("gameid %v does not exist\n", j.ID)
			} else {
				lobby.Clients[c] = true
				c.Lobby = lobby
				fmt.Println("joined lobby")
			}

		default:
			
			if c.Lobby != nil {
				fmt.Println("broadcasting")
				fmt.Println(c.Lobby.Broadcast)
				c.Lobby.Broadcast <- p
				fmt.Println("broadcasted")
			} else {
				fmt.Println("not in lobby")
			}
		}
	}
}
