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
	fmt.Println("Starting on port " + strconv.Itoa(config.Port))
	http.Handle("/", websocket.Handler(api.WsHandler))
	http.ListenAndServe(":"+strconv.Itoa(config.Port), nil)
}
