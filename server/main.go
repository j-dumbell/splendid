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
	allClients := make(map[*api.Client]bool)
	// allLobbies := make(map[string]api.Lobby)
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	wsHandler := api.MkWsHandler(allClients)
	http.Handle("/", websocket.Handler(wsHandler))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
