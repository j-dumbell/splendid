package main

import (
	"fmt"
	"net/http"
	"strconv"

	"golang.org/x/net/websocket"

	"github.com/j-dumbell/splendid/server/api"
	"github.com/j-dumbell/splendid/server/config"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
)

func main() {
	decks, elites := splendid.CreateDecks(config.CardsCSVPath, config.ElitesCSVPath)
	game := splendid.NewGame(decks, elites)
	lobby := api.NewLobby(game)
	go lobby.Run()
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	http.HandleFunc("/health", api.Health)
	http.Handle("/", websocket.Handler(lobby.HandleWs))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
