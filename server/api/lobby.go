package api

import (
	"encoding/json"
	"time"

	"golang.org/x/net/websocket"

)

// Lobby is a collection of websocket connections
type Lobby struct {
	Clients   map[*Client]bool
	broadcast chan Payload
	Join      chan *Client
	leave     chan *Client
}

// NewLobby instantiates a blank Lobby
func NewLobby() Lobby {
	return Lobby{
		Clients:   make(map[*Client]bool),
		broadcast: make(chan Payload),
		Join:      make(chan *Client),
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
	for client := range l.Clients {
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

<<<<<<< HEAD
=======
// WebSocket handles a websocket connection
func (l *Lobby) HandleWs(ws *websocket.Conn) {
	client := &Client{lobby: l, conn: ws, send: make(chan Response, 256)}
	fmt.Println(client)
	client.lobby.join <- client
	fmt.Println("HandleWS client")
	go client.ReadPump()
}

>>>>>>> 85070b9... debugging
func (l *Lobby) Run() {
	fmt.Println("starting l.Run")
	for {
<<<<<<< HEAD
		payload := <-l.broadcast
		err := l.HandleAction(payload)
		for client := range l.Clients {
			response := Response{
				Timestamp: time.Now().String(),
				Errors:    err,
=======
		select {
		case payload := <-l.broadcast:
			fmt.Println(payload)
			err := l.HandleAction(payload)
			for client := range l.Clients {
				response := Response{
					Timestamp: time.Now().String(),
					Game:      fmt.Sprintf("%+v", l.Game),
					Errors:    err,
				}
				client.send <- response
>>>>>>> 85070b9... debugging
			}
		}
		fmt.Println("lobby.run() for loop end")
	}
}
