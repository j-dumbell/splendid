package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/j-dumbell/splendid/server/api"
	"github.com/j-dumbell/splendid/server/config"
	"golang.org/x/net/websocket"
)

func main() {
	allClients := make(map[*api.Client]bool)
	allLobbies := make(map[string]*api.Lobby)
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	wsHandler := api.MkWsHandler(allClients, allLobbies)
	http.Handle("/", websocket.Handler(wsHandler))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
