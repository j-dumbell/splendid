package api

import (
	"fmt"

	"github.com/j-dumbell/splendid/server/api/messages"
	"golang.org/x/net/websocket"
)

type Client struct {
	conn  *websocket.Conn
	lobby *Lobby
	send  chan messages.Response
	name  string
	id    int
}

// ReadPump handles a Client's incoming messages
func (c *Client) readPump(newGame func() Game, allLobbies map[string]*Lobby, maxPlayers int) {
	defer func() {
		if c.lobby != nil {
			c.lobby.exit <- c
		}
		c.conn.Close()
	}()

	for {
		var p messages.Payload
		var err error

		err = websocket.JSON.Receive(c.conn, &p)

		switch p.Action {
		case "create":
			create(newGame, c, p.Params, allLobbies)
		case "join":
			err = join(c, p.Params, allLobbies, maxPlayers)
		case "exit":
			if c.lobby != nil {
				c.lobby.exit <- c
			}
		case "chat":
			err = chat(c, p.Params)
		case "game":
			pg := messages.GameParams{
				ClientID: c.id,
				Params:   p.Params,
			}
			c.lobby.gameActions <- pg
		default:
			err = fmt.Errorf("unrecognised action %v", p.Action)
		}

		if err != nil {
			c.send <- mkErrorResponse(p.Action, err)
		}
	}
}

func (c *Client) writePump() {
	for {
		r := <-c.send
		websocket.JSON.Send(c.conn, r)
	}
}
