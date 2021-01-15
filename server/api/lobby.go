package api

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/util"
)

type Lobby struct {
	id        string
	Clients   map[*Client]bool
	Broadcast chan (Payload)
}

type Chat struct {
	Message string `json:"message"`
}

func NewLobby(c *Client) Lobby {
	lobbyID := util.RandID(6, time.Now().UnixNano())

	return Lobby{
		id:        lobbyID,
		Clients:   map[*Client]bool{c: true},
		Broadcast: make(chan Payload),
	}
}

func (l *Lobby) Run() {
	fmt.Printf("Running lobby %v\n", l)
	for {
		p := <-l.Broadcast

		switch p.Action {
		case "chat":
			var c Chat
			json.Unmarshal(p.Params, &c)
			fmt.Printf("Chat received: %v", c.Message)

			for client := range l.Clients {
				r := Response{Message: c.Message}
				client.send <- r
			}
		}
	}
}
