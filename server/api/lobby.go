package api

import (
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
	fmt.Println("Starting lobby.run")
	for {
		fmt.Println("Starting for loop")
		fmt.Println(l.Broadcast)
		p := <-l.Broadcast
		fmt.Println(p)

		// select {
		// case p := <-l.Broadcast:
		// 	fmt.Println(p)
		// 	var c Chat
		// 	json.Unmarshal(p.Params, &c)
		// 	fmt.Println(c)
		// }
	}
}
