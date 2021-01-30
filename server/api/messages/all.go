package messages

import (
	"encoding/json"
)

// Response is the outgoing json object
type Response struct {
	Action  string          `json:"action"`
	Ok      bool            `json:"ok"`
	Details json.RawMessage `json:"details"`
}

// Payload is the incoming json object
type Payload struct {
	Action string          `json:"action"`
	Params json.RawMessage `json:"params"`
}

// CreateParams represents the params sent with a "create" action
type CreateParams struct {
	Name string `json:"name"`
}

// JoinParams represents the params sent with a "join" action
type JoinParams struct {
	LobbyID string `json:"id"`
	Name    string `json:"name"`
}

// MessageParams represents a json message string
type MessageParams struct {
	Message string `json:"message"`
}

// GameParams represents the params sent with a "game" action
type GameParams struct {
	ClientID int             `json:"clientId"`
	Params   json.RawMessage `json:"params"`
}

// GameResponse is the client level response from a game
type GameResponse struct {
	Ok      bool            `json:"ok"`
	Details json.RawMessage `json:"details"`
}

// LobbyResponse is the response returned on joining or exiting a lobby
type LobbyResponse struct {
	ID          string         `json:"id"`
	PlayerNames map[int]string `json:"playerNames"`
}
