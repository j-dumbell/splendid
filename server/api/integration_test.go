package api

import (
	"encoding/json"
	"net/http/httptest"
	"strings"
	"testing"

	"golang.org/x/net/websocket"
)

func TestCreateLobby(t *testing.T) {
	wsHandler := MkWsHandler(map[string]*Lobby{}, 2)
	s := httptest.NewServer(websocket.Handler(wsHandler))
	defer s.Close()

	wsURL := "ws" + strings.TrimPrefix(s.URL, "http")
	ws, errDial := websocket.Dial(wsURL, "", s.URL)
	if errDial != nil {
		t.Fatalf("%v", errDial)
	}
	_, errWrite := ws.Write([]byte("{\"action\": \"create\"}"))
	if errWrite != nil {
		t.Fatalf("%v", errWrite)
	}
	var msg = make([]byte, 512)
	n, errRead := ws.Read(msg)
	if errRead != nil {
		t.Fatalf("%v", errRead)
	}
	var r Response
	if errDecode := json.Unmarshal(msg[:n], &r); errDecode != nil {
		t.Fatalf("%v", errDecode)
	}
	if r.Category != "join" {
		t.Errorf("unexpected response category.  Received %v, expected join", r.Category)
	}
}
