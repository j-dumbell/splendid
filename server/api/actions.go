package api

import (
	"encoding/json"
	"fmt"
)

func create(c *Client) {
	lobby := NewLobby()
	fmt.Printf("Created lobby %v with lobbyId %v\n", lobby, lobby.id)
	go lobby.Run()
	lobby.join <- c
}

func join(c *Client, p Payload, allLobbies map[string]*Lobby) error {
	if c.lobby != nil {
		c.lobby.exit <- c
	}
	var j Join
	json.Unmarshal(p.Params, &j)
	lobby, exists := allLobbies[j.ID]
	if exists {
		lobby.join <- c
		return nil
	}
	return fmt.Errorf("lobby %v does not exist", j.ID)
}
