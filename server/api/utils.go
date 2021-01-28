package api

import (
	"encoding/json"

	"github.com/j-dumbell/splendid/server/api/messages"
)

func mkErrorResponse(action string, err error) messages.Response {
	details := messages.MessageParams{Message: err.Error()}
	d, _ := json.Marshal(details)
	return messages.Response{
		Action:  action,
		Ok:      false,
		Details: d,
	}
}
