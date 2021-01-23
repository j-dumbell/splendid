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

type gameName string

var splendidGame gameName = "splendid"

var nameToGame = map[gameName]func()api.Game{
	splendidGame: func() api.Game{return &splendid.Game{}},
}

func main() {
	allLobbies := make(map[string]*api.Lobby)
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	wsHandler := api.MkWsHandler(nameToGame[splendidGame], allLobbies, config.MaxPlayersDefault)
	http.Handle("/", websocket.Handler(wsHandler))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
