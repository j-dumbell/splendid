package api

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/api/messages"
	"github.com/j-dumbell/splendid/server/pkg/util"
)

type Lobby struct {
	id          string
	clients     map[int]*Client
	broadcast   chan (messages.Response)
	exit        chan (*Client)
	join        chan (*Client)
	gameActions chan (messages.GameParams)
	game        Game
}

type Game interface {
	HandleAction(int, json.RawMessage) map[int]messages.DetailsGame
	AddPlayer(int) error
	RemovePlayer(int) error
}

func NewLobby(newGame func() Game) Lobby {
	lobbyID := util.RandID(6, time.Now().UnixNano())
	return Lobby{
		id:          lobbyID,
		clients:     make(map[int]*Client),
		broadcast:   make(chan messages.Response),
		exit:        make(chan *Client),
		join:        make(chan *Client),
		gameActions: make(chan messages.GameParams),
		game:        newGame(),
	}
}

func (l *Lobby) Run() {
	for {

		select {
		case client := <-l.join:
			res := l.joinLobby(client)
			for _, client := range l.clients {
				client.send <- res
			}
		case client := <-l.exit:
			res := l.exitLobby(client)
			client.send <- res
			for _, otherClient := range l.clients {
				otherClient.send <- res
			}
		case message := <-l.broadcast:
			for _, c := range l.clients {
				c.send <- message
			}
		case ga := <-l.gameActions:
			idToResponse := l.game.HandleAction(ga.ClientID, ga.Params)
			for id, gameResponse := range idToResponse {
				response := messages.Response{
					Action:  "game",
					Ok:      gameResponse.Ok,
					Details: gameResponse.Details,
				}
				l.clients[id].send <- response
			}
		}
	}
}

func (l *Lobby) joinLobby(client *Client) messages.Response {
	if _, exists := l.clients[client.id]; exists {
		return mkErrorResponse("join", errors.New("already in lobby"))
	}
	if err := l.game.AddPlayer(client.id); err != nil {
		fmt.Printf("Error joining: %v", err.Error())
		return mkErrorResponse("join", err)
	}
	l.clients[client.id] = client
	client.lobby = l
	fmt.Printf("Client \"%v\" joined lobby \"%v\"\n", client.name, l.id)

	return messages.Response{
		Action:  "join",
		Ok:      true,
		Details: mkLobbyDetails(l.id, l.clients, client),
	}
}

func (l *Lobby) exitLobby(client *Client) messages.Response {
	fmt.Printf("Removing client \"%v\" from lobby \"%v\"\n", client.name, l.id)
	delete(l.clients, client.id)
	l.game.RemovePlayer(client.id)
	client.lobby = nil

	return messages.Response{
		Action:  "exit",
		Ok:      true,
		Details: mkLobbyDetails(l.id, l.clients, client),
	}
}
