package splendid

import (
	"errors"
	"fmt"
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
func NewBoard(decks map[int][]Card, elites []Elite) Board {
	seed := time.Now().Unix()

	for i := 1; i <= 3; i++ {
		decks[i] = util.Shuffle(decks[i], seed+int64(i)).([]Card)
	}
	fmt.Println(decks)

	return Board{
		Decks:  decks,
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

// VisibleDeckCards returns the visible cards from each deck
func VisibleDeckCards(decks map[int][]Card, capacity int) (map[int][]Card, error) {
	visDecks := make(map[int][]Card)
	for tier, deck := range decks {
		visDeck, err := lastCards(deck, capacity)
		if err != nil {
			return nil, err
		}
		visDecks[tier] = visDeck
	}
	return visDecks, nil
}

// GetCard checks whether <id> is visible and returns the corresponding card
func GetCard(decks map[int][]Card, ID int, capacity int) (Card, error) {
	visDecks, err := VisibleDeckCards(decks, capacity)
	if err != nil {
		return Card{}, err
	}
	for _, deck := range visDecks {
		for _, card := range deck {
			if card.ID == ID {
				return card, nil
			}
		}
	}
	return Card{}, errors.New("invalid card selected")
}
