package api

import (
	"encoding/json"
	"fmt"
	"time"

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
	Game      string `json:"game"`
	Errors    error  `json:"errors"`
}

// WebSocket handles a websocket connection
func WebSocket(l Lobby) func(*websocket.Conn) {
	return func(ws *websocket.Conn) {
		l.AddClient(ws)
		for {
			var p Payload
			var err error
			err = websocket.JSON.Receive(ws, &p)
			if err != nil {
				l.RemoveClient(ws)
				fmt.Println("ws end:", err)
				return
			}
			err = l.HandleAction(p)

			r := Response{
				Timestamp: time.Now().String(),
				Game:      fmt.Sprintf("%+v", l.Game),
				Errors:    err,
			}
			l.Broadcast(r)
		}
	}
}
