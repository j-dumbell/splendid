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
func WebSocket(deck1, deck2, deck3 []splendid.Card, elites []splendid.Elite) func(*websocket.Conn) {
	return func(ws *websocket.Conn) {
		for {
			var p Payload
			var board splendid.Board

			err := websocket.JSON.Receive(ws, &p)

			if err != nil {
				fmt.Println("ws end:", err)
				return
			}

			if p.Message == "new game" {
				board = splendid.NewBoard(deck1, deck2, deck3, elites)
			}

			r := Response{
				Timestamp: time.Now().String(),
				Payload:   &Payload{p.Message},
				Board:     fmt.Sprintf("%+v", board),
			}

			websocket.JSON.Send(ws, r)
		}
	}
}
