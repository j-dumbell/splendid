package splendid

import (
	"encoding/json"
	"errors"
	"fmt"
	"reflect"

	m "github.com/j-dumbell/splendid/server/pkg/ws/messages"
)

type payload struct {
	GameAction string `json:"gameAction"`
}

type buyCardParams struct {
	CardID    int            `json:"cardId"`
	Resources resourceParams `json:"resources"`
}

type takeResourceParams struct {
	Resources resourceParams `json:"resources"`
}

type reserveHiddenParams struct {
	Tier int `json:"tier"`
}

type reserveVisibleParams struct {
	CardID int `json:"cardId"`
}

type resourceParams struct {
	Black  int `json:"black"`
	White  int `json:"white"`
	Blue   int `json:"blue"`
	Green  int `json:"green"`
	Red    int `json:"red"`
	Yellow int `json:"yellow"`
}

type GameOver struct {
	Action   string `json:"action"`
	playerID int    `json:"playerId"`
}

func validateTake(toTake map[resource]int) error {
	if count, exists := toTake[Yellow]; exists && count >= 1 {
		return errors.New("cannot take yellow resources")
	}
	countFreq := map[int]int{}
	for _, num := range toTake {
		countFreq[num]++
	}
	if !(reflect.DeepEqual(countFreq, map[int]int{0: 5, 2: 1}) || reflect.DeepEqual(countFreq, map[int]int{0: 3, 1: 3})) {
		return errors.New("invalid resource combination")
	}
	return nil
}

// HandleAction maps action params into game actions
func (game *Game) HandleAction(id int, params json.RawMessage) map[int]m.DetailsGame {
	var payload payload
	err := json.Unmarshal(params, &payload)
	if err != nil {
		return mkErrorDetails(id, "unrecognized message")
	}
	if id != game.Players[game.ActivePlayerIndex].ID {
		if game.Turn == 0 {
			return mkErrorDetails(id, "game has not started")
		}
		return mkErrorDetails(id, "not active player")
	}
	switch payload.GameAction {
	case "startGame":
		fmt.Println("starting game")
		if err := game.StartGame(decks, elites); err != nil {
			return mkErrorDetails(id, err.Error())
		}
	case "buyCard":
		fmt.Println("buying card")
		var p buyCardParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		resources := paramsToBank(p.Resources)
		buyErr := game.buyCard(p.CardID, resources)
		if buyErr != nil {
			return mkErrorDetails(id, buyErr.Error())
		}
	case "takeResources":
		fmt.Println("taking resources")
		var p takeResourceParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		toTake := paramsToBank(p.Resources)
		if err := game.takeResources(toTake); err != nil {
			return mkErrorDetails(id, err.Error())
		}
	case "reserveHidden":
		fmt.Println("reserving hidden card")
		var p reserveHiddenParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		if err := game.reserveHidden(p.Tier); err != nil {
			return mkErrorDetails(id, err.Error())
		}
	case "reserveVisible":
		fmt.Println("reserving visible card")
		var p reserveVisibleParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		if err := game.reserveVisible(p.CardID); err != nil {
			return mkErrorDetails(id, err.Error())
		}
	default:
		return mkErrorDetails(id, "unrecognized action")
	}

	if winnerID := game.endTurn(); winnerID != 0 {
		winnerRes := map[int]m.DetailsGame{}
		details, _ := json.Marshal(GameOver{Action: "gameOver", playerID: winnerID})
		for _, p := range game.Players {
			winnerRes[p.ID] = m.DetailsGame{
				Ok:      true,
				Details: details,
			}
		}
		return winnerRes
	}
	return mkMaskedDetails(*game)
}
