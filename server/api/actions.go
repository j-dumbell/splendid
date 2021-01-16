package api

import (
	"encoding/json"
	"fmt"
)

func create(c *Client, allLobbies map[string]*Lobby) {
	l := NewLobby()
	fmt.Printf("Created lobby %v with lobbyId %v\n", l, l.id)
	allLobbies[l.id] = &l
	go l.Run()
	l.join <- c
}

func join(c *Client, p Payload, allLobbies map[string]*Lobby, maxPlayers int) error {
	if c.lobby != nil {
		c.lobby.exit <- c
	}
	var j PayloadJoin
	json.Unmarshal(p.Params, &j)
	l, exists := allLobbies[j.ID]
	if !exists {
		return fmt.Errorf("lobby %v does not exist", j.ID)
	}
	if len(l.clients) >= maxPlayers {
		return fmt.Errorf("lobby %v is full", l.id)
	}
	l.join <- c
	return nil
}
