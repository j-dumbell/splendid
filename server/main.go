package main

import (
	"fmt"
	"github.com/j-dumbell/splendid/routes"
	"net/http"
	"strconv"
)

func main() {
	port := 8000
	fmt.Println("Starting on port " + strconv.Itoa(port))
	http.HandleFunc("/health", routes.Health)
	http.ListenAndServe(":" + strconv.Itoa(port), nil)
}

