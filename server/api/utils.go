package api

import (
	"encoding/json"

	m "github.com/j-dumbell/splendid/server/api/messages"
)

// Game is the interface for any game
type Game interface {
	HandleAction(int, json.RawMessage) map[int]m.DetailsGame
	AddPlayer(int) error
	RemovePlayer(int) error
}

func mkErrorResponse(action string, err error) m.Response {
	details := m.MessageParams{Message: err.Error()}
	d, _ := json.Marshal(details)
	return m.Response{
		Action:  action,
		Ok:      false,
		Details: d,
	}
}

func mkLobbyDetails(lobbyID string, clients map[int]*client, currentClient *client) json.RawMessage {
	playerNames := make(map[int]string)
	for id, client := range clients {
		playerNames[id] = client.name
	}
	rj, _ := json.Marshal(m.DetailsLobby{
		LobbyID:     lobbyID,
		ClientID:    currentClient.id,
		PlayerNames: playerNames,
	})
	return rj
}
