package splendid

import (
	"errors"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
	"github.com/j-dumbell/splendid/server/pkg/util"
)

type board struct {
	Decks  map[int]Cards    `json:"decks"`
	Elites []elite          `json:"elites"`
	Bank   map[resource]int `json:"bank"`
}

func filterFn(tier int) func(c Card) bool {
	return func(c Card) bool {
		return c.Tier == tier
	}
}

func createDecks(cardsPath string, elitesPath string) (map[int]Cards, []elite) {
	cardRows, _ := util.ReadCSV(cardsPath)
	cards := createCards(cardRows)

	decks := make(map[int]Cards)
	for i := 1; i <= 3; i++ {
		decks[i] = cards.filter(filterFn(i))
	}

	eliteRows, _ := util.ReadCSV(elitesPath)
	elites := createElites(eliteRows)

	return decks, elites
}

func newBoard(decks map[int]Cards, elites []elite, gameConfig config.GameConfig) board {
	seed := time.Now().Unix()

	for i := 1; i <= 3; i++ {
		decks[i] = util.Shuffle(decks[i], seed+int64(i)).(Cards)
	}
	shuffledElites := util.Shuffle(elites, seed).([]elite)
	return board{
		Decks:  decks,
		Elites: shuffledElites[:gameConfig.ElitesCount],
		Bank: map[resource]int{
			Black:  gameConfig.ResourceCount,
			White:  gameConfig.ResourceCount,
			Red:    gameConfig.ResourceCount,
			Blue:   gameConfig.ResourceCount,
			Green:  gameConfig.ResourceCount,
			Yellow: config.YellowDefault,
		},
	}
}

func getCard(allCards []Cards, ID int) (Card, error) {
	f := func(card Card) bool { return card.ID == ID }
	for _, cards := range allCards {
		if filtered := cards.filter(f); len(filtered) == 1 {
			return filtered[0], nil
		}
	}
	return Card{}, errors.New("invalid card selected")
}
