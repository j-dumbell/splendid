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
	Clients 	map[*Client]bool
	broadcast 	chan []byte
	join 		chan *Client
	leave 		chan *Client
	Game    	splendid.Game
}

// NewLobby instantiates a blank Lobby
func NewLobby(g splendid.Game) Lobby {
	return Lobby{
		Clients: make(map[*Client]bool),
		broadcast: make(chan []byte),
		join: make(chan *Client),
		leave: make(chan *Client),
		Game: g,
	}
}

type JoinGame struct {
	Name string `json:"name"`
}

// BuyCard action values
type BuyCard struct {
	Name   string `json:"name"`
	CardID int    `json:"cardId"`
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
