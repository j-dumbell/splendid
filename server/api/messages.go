package api

import (
	"encoding/json"
)

type Response struct {
	Action  string          `json:"action"`
	Ok      bool            `json:"ok"`
	Details json.RawMessage `json:"details"`
}

type Payload struct {
	Action string          `json:"action"`
	Params json.RawMessage `json:"params"`
}

type PayloadCreate struct {
	Name string `json:"name"`
}

type PayloadJoin struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type PayloadChat struct {
	Message string `json:"message"`
}

type ResponseJoin struct {
	ID string `json:"lobbyId"`
}

type ReponseDetails struct {
	Message string `json:"message"`
}