package ws

import (
	"errors"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/util"
	m "github.com/j-dumbell/splendid/server/pkg/ws/messages"
)

// Lobby represents a group of connected clients
type Lobby struct {
	id          string
	clients     map[int]*client
	broadcast   chan (m.Response)
	exit        chan (*client)
	join        chan (*client)
	gameActions chan (m.GameParams)
	game        Game
}

func newLobby(newGame func() Game) Lobby {
	lobbyID := util.RandID(6, time.Now().UnixNano())
	return Lobby{
		id:          lobbyID,
		clients:     make(map[int]*client),
		broadcast:   make(chan m.Response),
		exit:        make(chan *client),
		join:        make(chan *client),
		gameActions: make(chan m.GameParams),
		game:        newGame(),
	}
}

func (lobby *Lobby) run() {
	for {
		select {
		case client := <-lobby.join:
			res := lobby.joinLobby(client)
			for _, client := range lobby.clients {
				client.send <- res
			}
		case client := <-lobby.exit:
			res := lobby.exitLobby(client)
			client.send <- res
			for _, otherClient := range lobby.clients {
				otherClient.send <- res
			}
		case message := <-lobby.broadcast:
			for _, c := range lobby.clients {
				c.send <- message
			}
		case ga := <-lobby.gameActions:
			idToResponse := lobby.game.HandleAction(ga.ClientID, ga.Params)
			for id, gameResponse := range idToResponse {
				response := m.Response{
					Action:  "game",
					Ok:      gameResponse.Ok,
					Details: gameResponse.Details,
				}
				lobby.clients[id].send <- response
			}
		}
	}
}

func (l *Lobby) joinLobby(client *client) m.Response {
	if _, exists := l.clients[client.id]; exists {
		return mkErrorResponse("join", errors.New("already in lobby"))
	}
	if err := l.game.AddPlayer(client.id); err != nil {
		return mkErrorResponse("join", err)
	}
	l.clients[client.id] = client
	client.lobby = l
	fmt.Printf("Client \"%v\" joined lobby \"%v\"\n", client.name, l.id)

	return m.Response{
		Action:  "join",
		Ok:      true,
		Details: mkLobbyDetails(l.id, l.clients, client),
	}
}

func (l *Lobby) exitLobby(client *client) m.Response {
	fmt.Printf("Removing client \"%v\" from lobby \"%v\"\n", client.name, l.id)
	delete(l.clients, client.id)
	l.game.RemovePlayer(client.id)
	client.lobby = nil

	return m.Response{
		Action:  "exit",
		Ok:      true,
		Details: mkLobbyDetails(l.id, l.clients, client),
	}
}
