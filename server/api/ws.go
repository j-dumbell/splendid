package api

import (
	m "github.com/j-dumbell/splendid/server/api/messages"
	"golang.org/x/net/websocket"
)

var startingID = 1

// MkWsHandler returns a websocket handler
func MkWsHandler(newGame func() Game, allLobbies map[string]*Lobby, maxPlayers int) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		client := &client{conn: ws, send: make(chan m.Response), id: startingID}
		startingID++
		go client.readPump(newGame, allLobbies, maxPlayers)
		client.writePump()
	}
}
