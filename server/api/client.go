package api

import "golang.org/x/net/websocket"

type Client struct {
	lobby *Lobby
	conn *websocket.Conn
	send chan Response
}
