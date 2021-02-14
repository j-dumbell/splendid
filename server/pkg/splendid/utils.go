package splendid

import (
	"encoding/json"
	"fmt"

	m "github.com/j-dumbell/splendid/server/api/messages"
	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
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

func paramsToBank(params resourceParams) map[resource]int {
	bank := map[resource]int{}
	bank[Black] = params.Black
	bank[White] = params.White
	bank[Blue] = params.Blue
	bank[Green] = params.Green
	bank[Red] = params.Red
	bank[Yellow] = params.Yellow
	return bank
}

func flattenVisibleCards(decks map[int]Cards) (allCards []Cards) {
	for _, cards := range decks {
		if len(cards) > config.DeckCapacity {
			allCards = append(allCards, cards[:config.DeckCapacity])
		} else {
			allCards = append(allCards, cards)
		}
	}
	return allCards
}

func countPurchased(cards Cards) map[resource]int {
	counts := createEmptyBank()
	for _, c := range cards {
		counts[c.Income]++
	}
	return counts
}

func moveResources(fromBank, toBank, cost map[resource]int) (map[resource]int, map[resource]int, error) {
	newFromBank := copyBank(fromBank)
	newToBank := copyBank(toBank)
	for res, amount := range cost {
		newFromBank[res] -= amount
		if newFromBank[res] < 0 {
			return nil, nil, fmt.Errorf("can't afford %v: %v", res, amount)
		}
		newToBank[res] += amount
	}
	return newFromBank, newToBank, nil
}

type sign string

var Addition sign = "add"
var Subtraction sign = "subtract"

func calcResources(poo, bum map[resource]int, s sign) map[resource]int {
	total := createEmptyBank()
	for res := range total {
		if s == Addition {
			total[res] = poo[res] + bum[res]
		} else {
			total[res] = poo[res] - bum[res]
		}
	}
	return total
}

// c.cost, resParams, purchasedcnt
// (cost - purchasedCnt) - resParams
