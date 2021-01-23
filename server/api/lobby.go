package api

import (
	"encoding/json"
	"fmt"
	"reflect"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/util"
)

type Lobby struct {
	id          string
	clients     map[*Client]bool
	broadcast   chan (Response)
	exit        chan (*Client)
	join        chan (*Client)
	gameActions chan (PayloadGame)
	game        Game
}

type Game interface {
	handleAction(PayloadGame)
}

// type ClientPlayer struct {
// 	playerName Ssring
// 	client     Client
// }

func NewLobby() Lobby {
	lobbyID := util.RandID(6, time.Now().UnixNano())
	return Lobby{
		id:        lobbyID,
		clients:   make(map[*Client]bool),
		broadcast: make(chan Response),
		exit:      make(chan *Client),
		join:      make(chan *Client),
	}
}

func (l *Lobby) Run() {
	for {
		var res Response
		var client *Client

		select {
		case client = <-l.exit:
			fmt.Printf("Removing client \"%v\" from lobby \"%v\"\n", client.name, l.id)
			delete(l.clients, client)
			client.lobby = nil
			res = Response{
				Action: "exit",
				Ok:     true,
			}
		case client = <-l.join:
			l.clients[client] = true
			client.lobby = l
			fmt.Printf("Client \"%v\" joined lobby \"%v\"\n", client.name, l.id)
			rj, _ := json.Marshal(ResponseJoin{ID: l.id})
			res = Response{
				Action:  "join",
				Ok:      true,
				Details: rj,
			}
		case message := <-l.broadcast:
			for c := range l.clients {
				c.send <- message
			}
		case ga := <-l.gameActions:
			l.game.handleAction(ga)
		}
		
		if !reflect.DeepEqual(res, Response{}) {
			client.send <- res
		}
	}
}
