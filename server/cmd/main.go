package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/j-dumbell/splendid/api"
)

func main() {
	port := 8080
	fmt.Println("Starting on port " + strconv.Itoa(port))
	http.HandleFunc("/health", api.Health)
	http.ListenAndServe(":"+strconv.Itoa(port), nil)
}
