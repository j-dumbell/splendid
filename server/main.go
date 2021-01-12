package main

import (
	"fmt"
	"net/http"
	"strconv"

	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/api"
	"github.com/j-dumbell/splendid/server/config"
)

func main() {
	holdingLobby := api.NewLobby()
	go holdingLobby.Run()
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	http.HandleFunc("/health", api.Health)
	wsHandler := api.MkWSHandler(&holdingLobby)
	http.Handle("/", websocket.Handler(wsHandler))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
