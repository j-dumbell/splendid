package ws

import (
	"fmt"

	m "github.com/j-dumbell/splendid/server/pkg/ws/messages"
	"golang.org/x/net/websocket"
)

type client struct {
	conn  *websocket.Conn
	lobby *Lobby
	send  chan m.Response
	name  string
	id    int
}

// ReadPump handles a Client's incoming messages
func (client *client) readPump(newGame func() Game, allLobbies map[string]*Lobby, maxPlayers int) {
	defer func() {
		if client.lobby != nil {
			client.lobby.exit <- client
		}
		client.conn.Close()
	}()

	for {
		var p m.Payload
		var err error
		err = websocket.JSON.Receive(client.conn, &p)

		switch p.Action {
		case "create":
			create(newGame, client, p.Params, allLobbies)
		case "join":
			err = join(client, p.Params, allLobbies, maxPlayers)
		case "exit":
			if client.lobby != nil {
				client.lobby.exit <- client
			}
		case "chat":
			err = chat(client, p.Params)
		case "game":
			gameParams := m.GameParams{
				ClientID: client.id,
				Params:   p.Params,
			}
			client.lobby.gameActions <- gameParams
		default:
			err = fmt.Errorf("unrecognised action %v", p.Action)
		}

		if err != nil {
			client.send <- mkErrorResponse(p.Action, err)
		}
	}
}

func (client *client) writePump() {
	for {
		r := <-client.send
		websocket.JSON.Send(client.conn, r)
	}
}
