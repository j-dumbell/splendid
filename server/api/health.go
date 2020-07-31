package api

import (
	"fmt"
	"net/http"
)

// Health is a handler for a health check endpoint
func Health(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	fmt.Fprintf(w, "ok")
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
