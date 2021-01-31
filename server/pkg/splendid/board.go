package splendid

import (
	"errors"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
	"github.com/j-dumbell/splendid/server/pkg/util"
)

// Board represents the game board
type Board struct {
	Decks  map[int][]Card   `json:"decks"`
	Elites []Elite          `json:"elites"`
	Bank   map[Resource]int `json:"bank"`
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

	decks := make(map[int][]Card)
	for i := 1; i <= 3; i++ {
		decks[i] = FilterCards(cards, FilterFn(i))
	}

	eliteRows, _ := util.ReadCSV(elitesPath)
	elites := CreateElites(eliteRows)

	return decks, elites
}

// NewBoard instantiates a new game board
func NewBoard(decks map[int][]Card, elites []Elite, gameConfig config.GameConfig) Board {
	seed := time.Now().Unix()

	for i := 1; i <= 3; i++ {
		decks[i] = util.Shuffle(decks[i], seed+int64(i)).([]Card)
	}
	shuffledElites := util.Shuffle(elites, seed).([]Elite)
	return Board{
		Decks:  decks,
		Elites: shuffledElites[:gameConfig.ElitesCount],
		Bank: map[Resource]int{
			Black:  gameConfig.ResourceCount,
			White:  gameConfig.ResourceCount,
			Red:    gameConfig.ResourceCount,
			Blue:   gameConfig.ResourceCount,
			Green:  gameConfig.ResourceCount,
			Yellow: config.YellowDefault,
		},
	}
}

// GetCard checks whether <id> is visible and returns the corresponding card
func GetCard(decks map[int][]Card, ID int) (Card, error) {
	maskedDecks := maskDecks(decks)
	for _, deck := range maskedDecks {
		for _, card := range deck {
			if card.ID == ID {
				return card, nil
			}
		}
	}
	return Card{}, errors.New("invalid card selected")
}
