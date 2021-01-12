package api

import (
	"encoding/json"
	"golang.org/x/net/websocket"
	"fmt"
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


// WebSocket handles a websocket connection
func MkWSHandler(lobby *Lobby) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		fmt.Println("hello, I am conn")
		client := &Client{lobby: lobby, conn: ws, send: make(chan Response)}
		fmt.Println("before channel dump")
		client.lobby.Join <- client
		fmt.Println("before readPump")
		go client.ReadPump()
	}
}
