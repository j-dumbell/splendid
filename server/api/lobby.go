package api

import (
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/util"
)

type Lobby struct {
	id        string
	clients   map[*Client]bool
	broadcast chan (Response)
	exit      chan (*Client)
	join      chan (*Client)
}

func NewLobby() Lobby {
	lobbyID := util.RandID(6, time.Now().UnixNano())
	return Lobby{
		id:        lobbyID,
		clients:   make(map[*Client]bool),
		broadcast: make(chan Response),
		exit:      make(chan *Client),
		join:      make(chan *Client),
	}
}

func (l *Lobby) Run() {
	for {
		select {
		case c := <-l.exit:
			fmt.Printf("Removing client %v from lobby %v\n", c, l.id)
			delete(l.clients, c)
		case c := <-l.join:
			l.clients[c] = true
			c.lobby = l
			fmt.Printf("Client %v joined lobby %v\n", c, l.id)
		case res := <-l.broadcast:
			for client := range l.clients {
				client.send <- res
			}
		}
	}
}
