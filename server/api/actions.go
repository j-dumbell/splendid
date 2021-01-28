package api

import (
	"encoding/json"
	"fmt"

	"github.com/j-dumbell/splendid/server/api/messages"
)

func create(newGame func() Game, c *Client, p json.RawMessage, allLobbies map[string]*Lobby) {
	l := NewLobby(newGame)
	fmt.Printf("Created lobby %v with lobbyId %v\n", l, l.id)
	allLobbies[l.id] = &l
	go l.Run()
	var createParams messages.CreateParams
	json.Unmarshal(p, &createParams)
	c.name = createParams.Name
	l.join <- c
}

func join(c *Client, p json.RawMessage, allLobbies map[string]*Lobby, maxPlayers int) error {
	if c.lobby != nil {
		return fmt.Errorf("already in lobby \"%v\"", c.lobby.id)
	}
	var joinParams messages.JoinParams
	json.Unmarshal(p, &joinParams)
	c.name = joinParams.Name
	l, exists := allLobbies[joinParams.LobbyID]
	if !exists {
		return fmt.Errorf("lobby \"%v\" does not exist", joinParams.LobbyID)
	}
	if len(l.clients) >= maxPlayers {
		return fmt.Errorf("lobby \"%v\" is full", l.id)
	}
	l.join <- c
	return nil
}

// TODO - json.RawMessage type could be garbled.  Use proper type instead?
func chat(c *Client, p json.RawMessage) error {
	if c.lobby != nil {
		c.lobby.broadcast <- messages.Response{Action: "chat", Ok: true, Details: p}
		return nil
	}
	return fmt.Errorf("client \"%v\" not in any lobby", c.name)
}
