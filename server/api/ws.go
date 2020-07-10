package api

import (
	"fmt"
	"time"

	"golang.org/x/net/websocket"
)

type Payload struct {
	Message string `json:"message"`
}

type Response struct {
	*Payload
	Timestamp string `json:"timestamp"`
}

func WebSocket(ws *websocket.Conn) {
	for {
		var p Payload
		err := websocket.JSON.Receive(ws, &p)

		if err != nil {
			fmt.Println("ws end:", err)
			return
		}

		r := Response{
			Timestamp: time.Now().String(),
			Payload:   &Payload{p.Message},
		}

		websocket.JSON.Send(ws, r)
	}
}
