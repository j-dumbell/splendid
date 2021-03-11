package main

import (
	"fmt"
	"net/http"
	"strconv"

	globals "github.com/j-dumbell/splendid/go/config"
	"github.com/j-dumbell/splendid/go/pkg/splendid"
	"github.com/j-dumbell/splendid/go/pkg/splendid/config"
	"github.com/j-dumbell/splendid/go/pkg/ws"
	"golang.org/x/net/websocket"
)

type gameName string

var SplendidGame gameName = "splendid"

var nameToGame = map[gameName]func() ws.Game{
	SplendidGame: func() ws.Game { return &splendid.Game{} },
}

func health(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "200")
}

func main() {
	allLobbies := make(map[string]*ws.Lobby)
	fmt.Println("Starting on port " + strconv.Itoa(globals.Port))
	wsHandler := ws.MkWsHandler(nameToGame[SplendidGame], allLobbies, config.MaxPlayersDefault)
	http.Handle("/", websocket.Handler(wsHandler))
	http.HandleFunc("/health", health)
	http.ListenAndServe(":"+strconv.Itoa(globals.Port), nil)
}
