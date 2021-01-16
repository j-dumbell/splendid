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

type PayloadJoin struct {
	ID string `json:"id"`
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
