package main

import (
	"fmt"
	"golang.org/x/net/websocket"
	"net/http"
	"strconv"

	"github.com/j-dumbell/splendid/server/api"
)

func main() {
	port := 8080
	fmt.Println("Starting on port " + strconv.Itoa(port))
	http.HandleFunc("/health", api.Health)
	http.Handle("/", websocket.Handler(api.WebSocket))
	http.ListenAndServe(":"+strconv.Itoa(port), nil)
}
