package api

import (
	"encoding/json"
	"fmt"
	"time"

	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/config"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
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
	Errors    error `json:"errors"`
}

// JoinGame represents the "join_game" values
type JoinGame struct {
	Name string `json:"name"`
}

type BuyCard struct {
	name string `json:"name"`
	ID	int `json:"id"`
}

// WebSocket handles a websocket connection
func WebSocket(decks map[int][]splendid.Card, elites []splendid.Elite) func(*websocket.Conn) {
	return func(ws *websocket.Conn) {
		var game splendid.Game
		for {
			var p Payload
			var err error
			err = websocket.JSON.Receive(ws, &p)
			if err != nil {
				fmt.Println("ws end:", err)
				return
			}

			switch p.Action {
			case "join_game":
				var j JoinGame
				json.Unmarshal(p.Values, &j)
				player := splendid.NewPlayer(j.Name)
				game.AddPlayer(player, config.MaxPlayersDefault)
			case "start_game":
				board := splendid.NewBoard(decks, elites)
				game.SetBoard(board)
				game.SetFirstPlayer(time.Now().Unix())
			case "buy_card":
				var b BuyCard
				json.Unmarshal(p.Values, &b)
				err = game.BuyCard(b.name, b.ID, config.BoardCapacity)
			}

			r := Response{
				Timestamp: time.Now().String(),
				Game:      fmt.Sprintf("%+v", game),
				Errors:    err,
			}

			websocket.JSON.Send(ws, r)
		}
	}
}
