package api

import (
	"encoding/json"
	"fmt"
	"time"

	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/pkg/splendid"
)

//Payload represents the received JSON
type Payload struct {
	Action string `json:"action"`
	Values json.RawMessage `json."value"`
}

// Response represents the JSON response
type Response struct {
	Timestamp string `json:"timestamp"`
	Game     string `json:"game"`
}

type JoinGame struct {
	Name string `json:"name"`
}

// WebSocket handles a websocket connection
func WebSocket(deck1, deck2, deck3 []splendid.Card, elites []splendid.Elite) func(*websocket.Conn) {
	return func(ws *websocket.Conn) {
		var game splendid.Game
		for {
			var p Payload
			err := websocket.JSON.Receive(ws, &p)
			if err != nil {
				fmt.Println("ws end:", err)
				return
			}

			switch p."Action" {
			case "join_game":
				var j JoinGame
				json.Unmarshal(p.values, j)
				player := splendid.NewPlayer(j.Name)
				game, _ = splendid.AddPlayer(game, player)
			case "start_game":
				board := splendid.NewBoard(deck1, deck2, deck3, elites)
				setBoard := splendid.UdateBoard(game, board)
				game := splendid.FirstPlayer(setBoard)
			}

			r := Response{
				Timestamp: time.Now().String(),
				Board:     fmt.Sprintf("%+v", game),
			}

			websocket.JSON.Send(ws, r)
		}
	}
}
