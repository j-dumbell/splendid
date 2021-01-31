package api

import (
	"github.com/j-dumbell/splendid/server/api/messages"
	"golang.org/x/net/websocket"
)

var startingID = 1

// MkWsHandler returns a websocket handler
func MkWsHandler(newGame func() Game, allLobbies map[string]*Lobby, maxPlayers int) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		c := &client{conn: ws, send: make(chan messages.Response), id: startingID}
		startingID++
		go c.readPump(newGame, allLobbies, maxPlayers)
		c.writePump()
	}
}
