package ws

import (
	"encoding/json"
	"fmt"

	m "github.com/j-dumbell/splendid/go/pkg/ws/messages"
)

func create(newGame func() Game, client *client, params json.RawMessage, allLobbies map[string]*Lobby) {
	lobby := newLobby(newGame)
	fmt.Printf("Created lobby %v with lobbyId %v\n", lobby, lobby.id)
	allLobbies[lobby.id] = &lobby
	go lobby.run()
	var createParams m.CreateParams
	json.Unmarshal(params, &createParams)
	client.name = createParams.Name
	lobby.join <- client
}

func join(client *client, params json.RawMessage, allLobbies map[string]*Lobby, maxPlayers int) error {
	if client.lobby != nil {
		return fmt.Errorf("already in lobby \"%v\"", client.lobby.id)
	}
	var joinParams m.JoinParams
	json.Unmarshal(params, &joinParams)
	client.name = joinParams.Name
	l, exists := allLobbies[joinParams.LobbyID]
	if !exists {
		return fmt.Errorf("lobby \"%v\" does not exist", joinParams.LobbyID)
	}
	if len(l.clients) >= maxPlayers {
		return fmt.Errorf("lobby \"%v\" is full", l.id)
	}
	l.join <- client
	return nil
}

// TODO - json.RawMessage type could be garbled.  Use proper type instead?
func chat(client *client, p json.RawMessage) error {
	if client.lobby != nil {
		client.lobby.broadcast <- m.Response{Action: "chat", Ok: true, Details: p}
		return nil
	}
	return fmt.Errorf("client \"%v\" not in any lobby", client.name)
}
