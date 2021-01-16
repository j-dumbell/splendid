package api

import (
	"encoding/json"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/util"
)

type Lobby struct {
	id        string
	clients   map[*Client]bool
	broadcast chan (Payload)
	exit      chan (*Client)
	join      chan (*Client)
}

func NewLobby() Lobby {
	lobbyID := util.RandID(6, time.Now().UnixNano())
	return Lobby{
		id:        lobbyID,
		clients:   make(map[*Client]bool),
		broadcast: make(chan Payload),
		exit:      make(chan *Client),
		join:      make(chan *Client),
	}
}

func (l *Lobby) Run() {
	for {
		select {
		case p := <-l.broadcast:
			switch p.Action {
			case "chat":
				var c PayloadChat
				json.Unmarshal(p.Params, &c)
				fmt.Printf("Chat received: %v\n", c.Message)

				for client := range l.clients {
					rc, _ := json.Marshal(ResponseChat{Message: c.Message})
					r := Response{Category: "chat", Body: rc}
					client.send <- r
				}
			}
		case c := <-l.exit:
			fmt.Printf("Removing client %v from lobby %v\n", c, l.id)
			delete(l.clients, c)
		case c := <-l.join:
			l.clients[c] = true
			c.lobby = l
			fmt.Printf("Client %v joined lobby %v\n", c, l.id)
		}
	}
}
