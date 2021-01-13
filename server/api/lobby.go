package api

import (
	"encoding/json"
	"fmt"
)

type Lobby struct {
	Clients   map[*Client]bool
	Broadcast chan (Payload)
}

type Chat struct {
	Message string `json:"message"`
}

func NewLobby() Lobby {
	return Lobby{Clients: make(map[*Client]bool)}
}

func (l *Lobby) Run() {
	fmt.Println("Starting lobby.run")
	for {
		fmt.Println("Starting for loop")
		select {
		case p := <-l.Broadcast:
			fmt.Println(p)
			var c Chat
			json.Unmarshal(p.Params, &c)
			fmt.Println(c)
		}
	}
}
