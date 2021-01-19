package api

import (
	"encoding/json"
)

func mkErrorResponse(action string, err error) Response {
	details := ReponseDetails{Message: err.Error()}
	d, _ := json.Marshal(details)
	return Response{
		Action:  action,
		Ok:      false,
		Details: d,
	}
}
