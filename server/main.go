package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/j-dumbell/splendid/server/api"
	globals "github.com/j-dumbell/splendid/server/config"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
	"golang.org/x/net/websocket"
)

type gameName string

var SplendidGame gameName = "splendid"

var nameToGame = map[gameName]func() api.Game{
	SplendidGame: func() api.Game { return &splendid.Game{} },
}

func main() {
	allLobbies := make(map[string]*api.Lobby)
	fmt.Println("Starting on port " + strconv.Itoa(globals.Port))
	wsHandler := api.MkWsHandler(nameToGame[SplendidGame], allLobbies, config.MaxPlayersDefault)
	http.Handle("/", websocket.Handler(wsHandler))
	http.ListenAndServe(":"+strconv.Itoa(globals.Port), nil)
}
