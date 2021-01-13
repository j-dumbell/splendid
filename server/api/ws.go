package api

import (
	"golang.org/x/net/websocket"
)

// MkWsHandler handles the incoming websocket connection
func MkWsHandler(allLobbies map[string]*Lobby) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		client := &Client{conn: ws}
		client.ReadPump(allLobbies)
	}
}
