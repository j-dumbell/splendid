package splendid

import (
	"encoding/json"

	m "github.com/j-dumbell/splendid/server/api/messages"
)

func copyBank(bank map[resource]int) map[resource]int {
	newBank := make(map[resource]int)
	for res, amount := range bank {
		newBank[res] = amount
	}
	return newBank
}

func createEmptyBank() map[resource]int {
	return map[resource]int{Black: 0, White: 0, Red: 0, Blue: 0, Green: 0, Yellow: 0}
}

func mkErrorDetails(id int, message string) map[int]m.DetailsGame {
	details, _ := json.Marshal(m.MessageParams{Message: message})
	return map[int]m.DetailsGame{id: {Ok: false, Details: details}}
}
