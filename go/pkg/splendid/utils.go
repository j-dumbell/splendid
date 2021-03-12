package splendid

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/j-dumbell/splendid/go/pkg/splendid/config"
	"github.com/j-dumbell/splendid/go/pkg/util"
	m "github.com/j-dumbell/splendid/go/pkg/ws/messages"
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

func countPurchased(cards Cards) map[resource]int {
	counts := createEmptyBank()
	for _, c := range cards {
		counts[c.Income]++
	}
	return counts
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

func amountPayable(inputResources, cardResources, cardCost map[resource]int) (map[resource]int, error) {
	deductable := createEmptyBank()
	totalAssets := subtractResources(cardCost, addResources(inputResources, cardResources))
	fmt.Println(totalAssets)
	outstandingCount := 0
	for res, amount := range totalAssets {
		if amount <= 0 {
			deductable[res] = util.MinInt(inputResources[res], cardCost[res])
		} else {
			outstandingCount += amount
		}
	}
	if outstandingCount-inputResources[Yellow] > 0 {
		return nil, errors.New("can't afford")
	}
	deductable[Yellow] = util.MinInt(outstandingCount, inputResources[Yellow])
	return deductable, nil
}

func playerPoints(p Player) int {
	points := 0
	for _, c := range p.Purchased {
		points += c.Points
	}
	for _, e := range p.Elites {
		points += e.Points
	}
	return points
}

func winnerID(players []Player) int {
	type playerMetric struct {
		player         Player
		points         int
		purchasedCount int
	}

	playerMetrics := []playerMetric{}
	maxPoints := 0
	for _, p := range players {
		points := playerPoints(p)
		playerMetrics = append(playerMetrics, playerMetric{player: p, points: points, purchasedCount: len(p.Purchased)})
		if points > maxPoints {
			maxPoints = points
		}
	}
	if maxPoints < 15 {
		return 0
	}
	tiedPlayers := []playerMetric{}
	for _, pm := range playerMetrics {
		if pm.points == maxPoints {
			tiedPlayers = append(tiedPlayers, pm)
		}
	}

	if len(tiedPlayers) == 1 {
		return tiedPlayers[0].player.ID
	}

	winningPlayer := tiedPlayers[0].player
	minPurchased := tiedPlayers[0].purchasedCount
	for _, pm := range tiedPlayers[1:] {
		if pm.purchasedCount < minPurchased {
			minPurchased = pm.purchasedCount
			winningPlayer = pm.player
		}
	}
	return winningPlayer.ID
}

func visibleCards(cards Cards) Cards {
	visible := make(Cards, len(cards))
	copy(visible, cards)
	if len(cards) >= config.DeckCapacity {
		return visible[:config.DeckCapacity]
	}
	return visible
}

func canAfford(buyer, cost map[resource]int) bool {
	for res, amount := range cost {
		if buyer[res]-amount < 0 {
			return false
		}
	}
	return true
}

func countResources(bank map[resource]int) int {
	count := 0
	for _, amount := range bank {
		count += amount
	}
	return count
}
