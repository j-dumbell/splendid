package api

import (
	"golang.org/x/net/websocket"
)

// WsHandler handles the incoming websocket connection
func MkWsHandler(allClients map[*Client]bool) func(ws *websocket.Conn) {
	return func(ws *websocket.Conn) {
		client := &Client{conn: ws}
		allClients[client] = true
		client.ReadPump(allClients)
	}
}
