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
	lobby := api.Lobby{
		Clients: map[string]*websocket.Conn{},
	}
	decks, elites := splendid.CreateDecks(config.CardsCSVPath, config.ElitesCSVPath)
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	http.HandleFunc("/health", api.Health)
	http.Handle("/", websocket.Handler(api.WebSocket(lobby, decks, elites)))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
