package api

import (
	"encoding/json"
)

type Response struct {
	Category string          `json:"category"`
	Body     json.RawMessage `json:"body"`
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

type ResponseError struct {
	Message string `json:"message"`
}

type ResponseChat struct {
	Message string `json:"message"`
}

type ResponseJoin struct {
	ID string `json:"lobbyId"`
}
