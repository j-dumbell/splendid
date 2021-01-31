package splendid

import (
	"errors"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
	"github.com/j-dumbell/splendid/server/pkg/util"
)

type board struct {
	Decks  map[int][]card   `json:"decks"`
	Elites []elite          `json:"elites"`
	Bank   map[resource]int `json:"bank"`
}

func filterFn(tier int) func(c card) bool {
	return func(c card) bool {
		return c.Tier == tier
	}
}

func createDecks(cardsPath string, elitesPath string) (map[int][]card, []elite) {
	cardRows, _ := util.ReadCSV(cardsPath)
	cards := createCards(cardRows)

	decks := make(map[int][]card)
	for i := 1; i <= 3; i++ {
		decks[i] = filterCards(cards, filterFn(i))
	}

	eliteRows, _ := util.ReadCSV(elitesPath)
	elites := createElites(eliteRows)

	return decks, elites
}

func newBoard(decks map[int][]card, elites []elite, gameConfig config.GameConfig) board {
	seed := time.Now().Unix()

	for i := 1; i <= 3; i++ {
		decks[i] = util.Shuffle(decks[i], seed+int64(i)).([]card)
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

func getCard(decks map[int][]card, ID int) (card, error) {
	maskedDecks := maskDecks(decks)
	for _, deck := range maskedDecks {
		for _, card := range deck {
			if card.ID == ID {
				return card, nil
			}
		}
	}
	return card{}, errors.New("invalid card selected")
}
