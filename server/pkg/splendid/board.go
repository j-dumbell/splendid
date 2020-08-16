package splendid

import (
	"time"

	"github.com/j-dumbell/splendid/server/config"
	"github.com/j-dumbell/splendid/server/pkg/util"
)

// Board represents the game board
type Board struct {
	Decks  map[int][]Card
	Elites []Elite
	Bank   map[Resource]int
}

// FilterFn returns a card tier filter function
func FilterFn(tier int) func(c Card) bool {
	return func(c Card) bool {
		return c.Tier == tier
	}
}

// CreateDecks Read card/elite records from csv and instantiate decks
func CreateDecks(cardsPath string, elitesPath string) (map[int][]Card, []Elite) {
	cardRows, _ := util.ReadCSV(cardsPath)
	cards := CreateCards(cardRows)

	var decks map[int][]Card
	for i := 1; i <= 3; i++ {
		decks[i] = FilterCards(cards, FilterFn(i))
	}

	eliteRows, _ := util.ReadCSV(elitesPath)
	elites := CreateElites(eliteRows)

	return decks, elites
}

// NewBoard instantiates a new game board
func NewBoard(decks map[int][]Card, elites []Elite) Board {
	seed := time.Now().Unix()

	var shuffledDecks map[int][]Card
	for i := 1; i <= 3; i++ {
		decks[i] = util.Shuffle(decks[i], seed+int64(i)).([]Card)
	}

	return Board{
		Decks:  shuffledDecks,
		Elites: util.Shuffle(elites, seed).([]Elite),
		Bank: map[Resource]int{
			Black:  config.ResourceDefault,
			White:  config.ResourceDefault,
			Red:    config.ResourceDefault,
			Blue:   config.ResourceDefault,
			Green:  config.ResourceDefault,
			Yellow: config.YellowDefault,
		},
	}
}
