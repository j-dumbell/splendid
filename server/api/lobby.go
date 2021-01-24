package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/util"
)

type Lobby struct {
	id          string
	clients     map[int]*Client
	broadcast   chan (Response)
	exit        chan (*Client)
	join        chan (*Client)
	gameActions chan (PayloadGame)
	game        Game
}

type Game interface {
	HandleAction(int, json.RawMessage) map[int]json.RawMessage
	AddPlayer(int) error
	RemovePlayer(int) error
	HasStarted() bool
}

func NewLobby(newGame func() Game) Lobby {
	lobbyID := util.RandID(6, time.Now().UnixNano())
	return Lobby{
		id:          lobbyID,
		clients:     make(map[int]*Client),
		broadcast:   make(chan Response),
		exit:        make(chan *Client),
		join:        make(chan *Client),
		gameActions: make(chan PayloadGame),
		game:        newGame(),
	}
}

func (l *Lobby) Run() {
	for {

		select {
		case client := <-l.join:
			res := l.joinLobby(client)
			client.send <- res
		case client := <-l.exit:
			res := l.exitLobby(client)
			client.send <- res
		case message := <-l.broadcast:
			for _, c := range l.clients {
				c.send <- message
			}
		case ga := <-l.gameActions:
			idToResponse := l.game.HandleAction(ga.id, ga.params)
			for id, message := range idToResponse {
				response := Response{
					Action:  "game",
					Ok:      true,
					Details: message,
				}
				l.clients[id].send <- response
			}
		}
	}
}

func (l *Lobby) joinLobby(client *Client) Response {
	if _, exists := l.clients[client.id]; exists {
		return mkErrorResponse("join", errors.New("already in lobby"))
	}
	l.clients[client.id] = client
	client.lobby = l
	if err := l.game.AddPlayer(client.id); err != nil {
		return mkErrorResponse("join", err)
	}
	fmt.Printf("Client \"%v\" joined lobby \"%v\"\n", client.name, l.id)
	rj, _ := json.Marshal(ResponseJoin{ID: l.id})
	return Response{
		Action:  "join",
		Ok:      true,
		Details: rj,
	}
}

func (l *Lobby) exitLobby(client *Client) Response {
	fmt.Printf("Removing client \"%v\" from lobby \"%v\"\n", client.name, l.id)
	delete(l.clients, client.id)
	l.game.RemovePlayer(client.id)
	client.lobby = nil
	return Response{
		Action: "exit",
		Ok:     true,
	}
}
