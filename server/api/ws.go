package api

import (
	"fmt"
	"time"

	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/pkg/splendid"
)

// Payload represents the JSON payload received
type Payload struct {
	Message string `json:"message"`
}

// Response represents the JSON response
type Response struct {
	*Payload
	Timestamp string `json:"timestamp"`
	Board     string `json:"board"`
}

// WebSocket handles a websocket connection
func WebSocket(ws *websocket.Conn) {
	for {
		var p Payload
		var board splendid.Board

		err := websocket.JSON.Receive(ws, &p)

		if err != nil {
			fmt.Println("ws end:", err)
			return
		}

		if p.Message == "new game" {
			board = splendid.NewBoard(splendid.Deck1, splendid.Deck2, splendid.Deck3, splendid.Elites)
		}

		r := Response{
			Timestamp: time.Now().String(),
			Payload:   &Payload{p.Message},
			Board:     fmt.Sprintf("%+v", board),
		}

		websocket.JSON.Send(ws, r)
	}
}
