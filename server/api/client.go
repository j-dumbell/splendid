package api

import(
	"golang.org/x/net/websocket"
	"fmt"
	"encoding/json"
	"github.com/j-dumbell/splendid/server/pkg/util"
	"time"
)


type Client struct{
	conn  *websocket.Conn
	Lobby *Lobby
}

type Payload struct{
	Action string `json:"action"`
	Params json.RawMessage `json:"params"`
}

type Join struct {
	Id string `json:"id"`
}

func (c *Client) ReadPump(allClients map[*Client]bool, allLobbies map[string]*Lobby) {
	defer func() {
		delete(allClients, c)
		if c.Lobby != nil {
			delete(c.Lobby.Clients, c)
		}
	}()
	for {
		var p Payload
		err := websocket.JSON.Receive(c.conn, &p)
		if p.Action == "create" {
			lobby := NewLobby()
			lobbyID := util.RandId(6, time.Now().UnixNano())
			allLobbies[lobbyID] = &lobby
			fmt.Printf("created lobby %v", lobbyID)
			lobby.Clients[c] = true
			c.Lobby = &lobby
		}
		if p.Action == "join" {
			delete(c.Lobby.Clients, c)
			var j Join
			err = json.Unmarshal(p.Params, &j)
			lobby, exists := allLobbies[j.Id]
			if !exists {
				fmt.Printf("gameid %v does not exist", j.Id)
			}
			lobby.Clients[c] = true
			c.Lobby = lobby
			fmt.Println("joined lobby")
		}
		if err != nil {
			fmt.Printf("ws read error: %v", err)
			break
		}
	}
}
