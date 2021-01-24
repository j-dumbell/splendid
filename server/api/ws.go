package api

import (
	"golang.org/x/net/websocket"
)

// MkWsHandler returns a websocket handler
func MkWsHandler(newGame func() Game, allLobbies map[string]*Lobby, maxPlayers int) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		c := &Client{conn: ws, send: make(chan Response)}
		go c.ReadPump(newGame, allLobbies, maxPlayers)
		c.WritePump()
	}
}
