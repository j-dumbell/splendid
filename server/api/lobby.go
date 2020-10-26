package api

import (
	"encoding/json"
	"time"

	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/config"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
	"github.com/j-dumbell/splendid/server/pkg/util"
)

// Lobby is a collection of websocket connections
type Lobby struct {
	Clients   map[*Client]bool
	broadcast chan Payload
	join      chan *Client
	leave     chan *Client
	Game      splendid.Game
}

// NewLobby instantiates a blank Lobby
func NewLobby(g splendid.Game) Lobby {
	return Lobby{
		Clients:   make(map[*Client]bool),
		broadcast: make(chan Payload),
		join:      make(chan *Client),
		leave:     make(chan *Client),
		Game:      g,
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
		player := splendid.NewPlayer(j.Name)
		l.Game.AddPlayer(player, config.MaxPlayersDefault)
	case "start_game":
		shuffledPlayers := util.Shuffle(l.Game.Players, time.Now().Unix())
		l.Game.Players = shuffledPlayers.([]splendid.Player)
	case "buy_card":
		var b BuyCard
		json.Unmarshal(p.Values, &b)
		err = l.Game.BuyCard(b.Name, b.CardID, config.DeckCapacity)
	}

	return err
}

// WebSocket handles a websocket connection
func (l *Lobby) HandleWs(ws *websocket.Conn) {
	client := &Client{lobby: l, conn: ws, send: make(chan Response)}
	client.lobby.join <- client

	go client.ReadPump()
}
