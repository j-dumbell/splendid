package api

import (
	"encoding/json"
	"time"

	"golang.org/x/net/websocket"
)

// Lobby is a collection of websocket connections
type Lobby struct {
	clients   map[*Client]bool
	broadcast chan Payload
	join      chan *Client
	leave     chan *Client
}

// NewLobby instantiates a blank Lobby
func NewLobby() Lobby {
	return Lobby{
		clients:   make(map[*Client]bool),
		broadcast: make(chan Payload),
		join:      make(chan *Client),
		leave:     make(chan *Client),
	}
}

// JoinGame action values
type JoinGame struct {
	Name string `json:"name"`
}

// BuyCard action values
type BuyCard struct {
	Name   string `json:"name"`
	CardID int    `json:"cardId"`
}

// Broadcast sends a message to all clients in a Lobby
func (l *Lobby) Broadcast(r Response) {
	for client := range l.clients {
		websocket.JSON.Send(client.conn, r)
	}
}

// HandleAction will execute game logic depending on the action
func (l *Lobby) HandleAction(p Payload) error {
	var err error

	switch p.Action {
	case "join_game":
		var j JoinGame
		json.Unmarshal(p.Values, &j)
	case "start_game":
	case "buy_card":
		var b BuyCard
		json.Unmarshal(p.Values, &b)
	}
	return err
}

// HandleWs handles a websocket connection
func (l *Lobby) HandleWs(ws *websocket.Conn) {
	client := &Client{lobby: l, conn: ws, send: make(chan Response, 256)}
	client.lobby.join <- client
	client.ReadPump()
}

// Run puts messages on all client's `send` channels
func (l *Lobby) Run() {
	for {
		select {
		case conn := <-l.join:
			l.clients[conn] = true
		case conn := <-l.leave:
			delete(l.clients, conn)
		case payload := <-l.broadcast:
			err := l.HandleAction(payload)
			for client := range l.clients {
				response := Response{
					Timestamp: time.Now().String(),
					Errors:    err,
				}
				client.send <- response
			}
		}
	}
}
