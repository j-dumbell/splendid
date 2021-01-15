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
	return Lobby{Clients: make(map[*Client]bool), Broadcast: make(chan Payload)}
}

func (l *Lobby) Run() {
	fmt.Printf("Running lobby %v\n", l)
	for {
		p := <-l.Broadcast
		var c Chat
		json.Unmarshal(p.Params, &c)
		fmt.Printf("Chat received: %v", c.Message)
	}
}
