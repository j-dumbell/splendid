package main

import (
	"fmt"
	"net/http"
	"strconv"

	"fmt"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
	"net/http"
	"github.com/j-dumbell/splendid/server/api"
	"strconv"

	"github.com/j-dumbell/splendid/server/pkg/splendid"
	"github.com/j-dumbell/splendid/server/config"


	"golang.org/x/net/websocket"
)

func main() {
	port := 8080
	fmt.Println("Starting on port " + strconv.Itoa(port))
	http.HandleFunc("/health", api.Health)
	http.Handle("/", websocket.Handler(api.WebSocket))
	http.ListenAndServe(":"+strconv.Itoa(port), nil)

}
