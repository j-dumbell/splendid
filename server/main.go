package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/j-dumbell/splendid/server/api"
	"github.com/j-dumbell/splendid/server/config"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
	"golang.org/x/net/websocket"
)

func main() {
	var interfaceGame api.Game
	interfaceGame = &splendid.Game{}
	allLobbies := make(map[string]*api.Lobby)
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	wsHandler := api.MkWsHandler(interfaceGame, allLobbies, config.MaxPlayersDefault)
	http.Handle("/", websocket.Handler(wsHandler))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
