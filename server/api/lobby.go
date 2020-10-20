package api

import (
	"encoding/json"
	"errors"
	"time"

	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/config"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
	"github.com/j-dumbell/splendid/server/pkg/util"
	"github.com/google/uuid"
)

// Lobby is a collection of websocket connections
type Lobby struct {
	Clients map[string]*websocket.Conn
	Game    splendid.Game
	ID 		string
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

//LobbyPool is a map of Lobby.ID -> Lobby
type LobbyPool map[string]Lobby

// AddClient adds a websocket connection to a Lobby
func (lp *LobbyPool) AddClient(ws *websocket.Conn, lobbyID string, maxPlayers int) error {
	lobby, exists := (*lp)[lobbyID]
	if !exists {
		return errors.New("lobbyID does not exist")
	}
	if len(lobby.Clients) >= maxPlayers {
		return errors.New("lobby is full")
	}
	lobby.Clients[ws.RemoteAddr().String()] = ws
	return nil
}

// RemoveClient removes a websocket connection from a lobby
func (lp *LobbyPool) RemoveClient(ws *websocket.Conn, lobbyID string) error {
	lobby, lobbyExists := (*lp)[lobbyID]
	if !lobbyExists {
		return errors.New("lobbyID does not exist")
	}
	address := ws.RemoteAddr().String()
	_, wsExists := lobby.Clients[address]
	if !wsExists {
		return errors.New("address does not exist in lobby")
	}
	delete(lobby.Clients, address)
	return nil
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

// AddLobby instantiates a blank Lobby and adds to the LobbyPool
func (lp *LobbyPool) AddLobby(g splendid.Game) {
	id := uuid.New().String()
	(*lp)[id] = Lobby{
		Clients: map[string]*websocket.Conn{},
		Game:    g,
		ID: 	 id,
	}
}

