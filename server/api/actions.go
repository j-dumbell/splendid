package api

import (
	"encoding/json"
	"fmt"
)

func create(c *Client, allLobbies map[string]*Lobby) Response {
	l := NewLobby()
	fmt.Printf("Created lobby %v with lobbyId %v\n", l, l.id)
	allLobbies[l.id] = &l
	go l.Run()
	l.join <- c
	rj, _ := json.Marshal(ResponseJoin{ID: l.id})
	return Response{
		Category: "create",
		Body:     rj,
	}
}

func join(c *Client, p Payload, allLobbies map[string]*Lobby, maxPlayers int) (Response, error) {
	if c.lobby != nil {
		c.lobby.exit <- c
	}
	var j PayloadJoin
	json.Unmarshal(p.Params, &j)
	l, exists := allLobbies[j.ID]
	if !exists {
		return Response{}, fmt.Errorf("lobby %v does not exist", j.ID)
	}
	if len(l.clients) >= maxPlayers {
		return Response{}, fmt.Errorf("lobby %v is full", l.id)
	}
	l.join <- c
	rj, _ := json.Marshal(ResponseJoin{ID: l.id})
	resp := Response{
		Category: "join",
		Body:     rj,
	}
	return resp, nil
}

func chat(c *Client, p json.RawMessage) error {
	if c.lobby != nil {
		c.lobby.broadcast <- Response{Category: "chat", Body: p}
		return nil
	}
	return fmt.Errorf("client %v not in any lobby", c)
}
