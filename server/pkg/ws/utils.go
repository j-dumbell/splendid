package ws

import (
	"encoding/json"

	m "github.com/j-dumbell/splendid/server/pkg/ws/messages"
)

// Game is the interface for any game
type Game interface {
	HandleAction(int, json.RawMessage) map[int]m.DetailsGame
	AddPlayer(int) error
	RemovePlayer(int) error
}

func mkErrorResponse(action string, err error) m.Response {
	messageParams := m.MessageParams{Message: err.Error()}
	details, _ := json.Marshal(messageParams)
	return m.Response{
		Action:  action,
		Ok:      false,
		Details: details,
	}
}

func mkLobbyDetails(lobbyID string, clients map[int]*client, currentClient *client) json.RawMessage {
	playerNames := make(map[int]string)
	for id, client := range clients {
		playerNames[id] = client.name
	}
	lobbyDetails, _ := json.Marshal(m.DetailsLobby{
		LobbyID:     lobbyID,
		ClientID:    currentClient.id,
		PlayerNames: playerNames,
	})
	return lobbyDetails
}
