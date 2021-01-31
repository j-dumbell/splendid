package api

import (
	"encoding/json"

	"github.com/j-dumbell/splendid/server/api/messages"
)

// Game is the interface for any game
type Game interface {
	HandleAction(int, json.RawMessage) map[int]messages.DetailsGame
	AddPlayer(int) error
	RemovePlayer(int) error
}

func mkErrorResponse(action string, err error) messages.Response {
	details := messages.MessageParams{Message: err.Error()}
	d, _ := json.Marshal(details)
	return messages.Response{
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
	rj, _ := json.Marshal(messages.DetailsLobby{
		LobbyID:     lobbyID,
		ClientID:    currentClient.id,
		PlayerNames: playerNames,
	})
	return rj
}
