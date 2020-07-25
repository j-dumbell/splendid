package main

import (
	//"fmt"
	//"net/http"
	"fmt"
	"github.com/j-dumbell/splendid/server/pkg/splendid"
	//"strconv"

	//"github.com/j-dumbell/splendid/server/api"
	//
	//"golang.org/x/net/websocket"
)

func main() {
	//port := 8080
	//fmt.Println("Starting on port " + strconv.Itoa(port))
	//http.HandleFunc("/health", api.Health)
	//http.Handle("/", websocket.Handler(api.WebSocket))
	//http.ListenAndServe(":"+strconv.Itoa(port), nil)

	_, err := splendid.ReadCards("./config/cards.csv")
	if err != nil {
		fmt.Println(err)
	}
}
