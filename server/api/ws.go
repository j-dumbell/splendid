package api

import (
	"golang.org/x/net/websocket"
)

// WsHandler handles the incoming websocket connection
func WsHandler(ws *websocket.Conn) {
	client := &Client{conn: ws}
	client.ReadPump()
}
