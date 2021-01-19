package api

import (
	"encoding/json"
	"fmt"
)

func create(c *Client, p Payload, allLobbies map[string]*Lobby) {
	l := NewLobby()
	fmt.Printf("Created lobby %v with lobbyId %v\n", l, l.id)
	allLobbies[l.id] = &l
	go l.Run()
	var pc PayloadCreate
	json.Unmarshal(p.Params, &pc)
	c.name = pc.Name
	l.join <- c
}

func join(c *Client, p Payload, allLobbies map[string]*Lobby, maxPlayers int) error {
	if c.lobby != nil {
		return fmt.Errorf("already in lobby \"%v\"", c.lobby.id)
	}
	var j PayloadJoin
	json.Unmarshal(p.Params, &j)
	c.name = j.Name
	l, exists := allLobbies[j.ID]
	if !exists {
		return fmt.Errorf("lobby \"%v\" does not exist", j.ID)
	}
	if len(l.clients) >= maxPlayers {
		return fmt.Errorf("lobby \"%v\" is full", l.id)
	}
	l.join <- c
	return nil
}

func chat(c *Client, p json.RawMessage) error {
	if c.lobby != nil {
		c.lobby.broadcast <- Response{Category: "chat", Body: p}
		return nil
	}
	return fmt.Errorf("client \"%v\" not in any lobby", c.name)
}
