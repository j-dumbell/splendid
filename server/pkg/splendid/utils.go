package splendid

import (
	"encoding/json"
	"errors"
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

func addResources(b1, b2 map[resource]int) map[resource]int {
	total := createEmptyBank()
	for res := range total {
		total[res] = b1[res] + b2[res]
	}
	return total
}

func subtractResources(b1, b2 map[resource]int) map[resource]int {
	total := createEmptyBank()
	for res := range total {
		total[res] = b1[res] - b2[res]
	}
	return total
}

// yellows count for any resource
// Any shortfall should be paid with Yellow
// Use tokens instead of cards when overpayment
// When paying more than the card is worth, use min tokens required.

func abc(inputResources, cardResources, cardCost map[resource]int) (map[resource]int, error) {
	deduction := createEmptyBank()

	// Remove inputted resources from what the card costs to calc shortfall
	outstandingCost := subtractResources(cardCost, inputResources)

	// Remove purchased cards from the shortfall
	newOutstandingCost := createEmptyBank()
	for res, amount := range outstandingCost {
		if amount > 0 {
			// Underpaid
			calc := amount - cardResources[res]
			if calc < 0 {
				deduction[res] = inputResources[res]
			} else {
				newOutstandingCost[res] = calc
			}
		} else {
			// Overpaid, exact or Yellow
			deduction[res] = cardCost[res]
		}
	}

	// newOutstandingCost := {
	// 	Yellow: 0
	// 	Black: 1
	// 	Blue: 1
	// 	Green: 0
	// 	Red: 0
	// 	White: 0
	// }

	// Summing the total shortfall as a value
	totalUnderpaid := 0
	for res, amount := range newOutstandingCost {
		totalUnderpaid += amount
	}

	// Check if there are enough yellows to cover this shortfall
	if totalUnderpaid-inputResources[Yellow] > 0 {
		return nil, errors.New("can't afford")
	}

	return deduction, nil
}
