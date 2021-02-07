package splendid

import (
	"encoding/json"
	"errors"
	"fmt"
	"reflect"

	m "github.com/j-dumbell/splendid/server/api/messages"
)

type payload struct {
	GameAction string `json:"gameAction"`
}

type buyCardParams struct {
	CardID    int            `json:"cardId"`
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

func validateTake(toTake map[resource]int) error {
	if count, exists := toTake[Yellow]; exists && count >= 1 {
		return errors.New("cannot take yellow resources")
	}
	countFreq := map[int]int{}
	for _, num := range toTake {
		countFreq[num]++
	}
	if !(reflect.DeepEqual(countFreq, map[int]int{0: 4, 2: 1}) || reflect.DeepEqual(countFreq, map[int]int{0: 2, 1: 3})) {
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
		return mkMaskedDetails(*game)
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
		return mkMaskedDetails(*game)
	case "takeResources":
		fmt.Println("taking resources")
		var p resourceParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		toTake := paramsToBank(p)
		if err := game.takeResources(toTake); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		return mkMaskedDetails(*game)
	case "reserveHidden":
		fmt.Println("reserving hidden card")
		var p reserveHiddenParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		if err := game.reserveHidden(p.Tier); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		return mkMaskedDetails(*game)
	case "reserveVisible":
		fmt.Println("reserving visible card")
		var p reserveVisibleParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		if err := game.reserveVisible(p.CardID); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		return mkMaskedDetails(*game)
	default:
		return mkErrorDetails(id, "unrecognized action")
	}
}
