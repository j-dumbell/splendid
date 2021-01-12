package api

import (
	"fmt"

	"golang.org/x/net/websocket"
)

type Client struct {
	lobby *Lobby
	conn  *websocket.Conn
	send  chan Response
}

func (c *Client) ReadPump() {
	defer func() {
		c.lobby.leave <- c
		c.conn.Close()
	}()

	for {
		var p Payload
		err := websocket.JSON.Receive(c.conn, &p)
		fmt.Println(p)
		if err != nil {
			fmt.Printf("ws read error: %v", err)
			break
		}
		c.lobby.broadcast <- p
	}
}
