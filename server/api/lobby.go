package api

import (
	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/pkg/splendid"
)

// Lobby is a collection of websocket connections
type Lobby struct {
	Clients map[string]*websocket.Conn
	Game    splendid.Game
}

// AddClient adds a websocket connection to a Lobby
func (l *Lobby) AddClient(ws *websocket.Conn) {
	l.Clients[ws.RemoteAddr().String()] = ws
}

// RemoveClient removes a websocket connection to a Lobby
func (l *Lobby) RemoveClient(ws *websocket.Conn) {
	delete(l.Clients, ws.RemoteAddr().String())
}

// Broadcast sends a message to all clients in a Lobby
func (l *Lobby) Broadcast(r Response) {
	for _, conn := range l.Clients {
		websocket.JSON.Send(conn, r)
	}
}

// NewLobby instantiates a blank Lobby
func NewLobby() Lobby {
	return Lobby{
		Clients: map[string]*websocket.Conn{},
		Game:    splendid.Game{},
	}
}
