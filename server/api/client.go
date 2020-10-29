package api

import (
	"fmt"

	"golang.org/x/net/websocket"
)

// Client represents a connected user
type Client struct {
	lobby *Lobby
	conn  *websocket.Conn
	send  chan Response
}

// ReadPump pulls messages from the clients and puts them on a broadcast channel
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
		fmt.Println(p)
		c.lobby.broadcast <- p
	}
}
