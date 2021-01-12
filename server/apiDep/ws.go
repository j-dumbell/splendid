package api

import (
	"encoding/json"

	"golang.org/x/net/websocket"
)

// Payload represents the received JSON
type Payload struct {
	Action string          `json:"action"`
	Values json.RawMessage `json:"value"`
}

// Response represents the JSON response
type Response struct {
	Timestamp string `json:"timestamp"`
	Errors    error  `json:"errors"`
}

// MkWSHandler handles a websocket connection
func MkWSHandler(lobby *Lobby) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		client := &Client{lobby: lobby, conn: ws, send: make(chan Response)}
		client.lobby.join <- client
		go client.ReadPump()
	}
}
