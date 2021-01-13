package api

import(
	"golang.org/x/net/websocket"
	"fmt"
)


type Client struct{
	conn  *websocket.Conn
	
}

type Payload struct{
	Message string `json:"message"`
}

func (c *Client) ReadPump(allClients map[*Client]bool) {
	defer func() {
		delete(allClients, c)
	}()
	for {
		var p Payload
		err := websocket.JSON.Receive(c.conn, &p)
		fmt.Println(p)
		if err != nil {
			fmt.Printf("ws read error: %v", err)
			break
		}
	}
}