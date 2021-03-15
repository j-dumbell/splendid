package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/j-dumbell/splendid/go/pkg/splendid"
	"github.com/j-dumbell/splendid/go/pkg/splendid/config"
	"github.com/j-dumbell/splendid/go/pkg/ws"
	"golang.org/x/net/websocket"
)

var port int = 8080

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
	fmt.Println("Starting on port " + strconv.Itoa(port))
	wsHandler := ws.MkWsHandler(nameToGame[SplendidGame], allLobbies, config.MaxPlayersDefault)
	http.Handle("/", websocket.Handler(wsHandler))
	http.HandleFunc("/health", health)
	http.ListenAndServe(":"+strconv.Itoa(port), nil)
}
