package splendid

import (
	"errors"
	"github.com/j-dumbell/splendid/server/pkg/util"
	"reflect"
)

// Card represents a development card
type Card struct {
	ID       int
	Tier     int
	Points   int
	Cost     map[Resource]int
	Income   Resource
	IsPublic bool
}

// CreateCards creates a list of Card structs from CSV data
func CreateCards(rows [][]string) []Card {
	var cards []Card
	for i, row := range rows {
		cards = append(cards, Card{
			ID:     i + 1,
			Tier:   util.StringToInt(row[0]),
			Points: util.StringToInt(row[2]),
			Cost: map[Resource]int{
				Black: util.StringToInt(row[3]),
				White: util.StringToInt(row[4]),
				Red:   util.StringToInt(row[5]),
				Blue:  util.StringToInt(row[6]),
				Green: util.StringToInt(row[7]),
			},
			Income:   MapResource(row[1]),
			IsPublic: false,
		})
	}
	return cards
}

// FilterCards returns a slice of Card structs that pass the
// test implemented by the provided function
func FilterCards(cards []Card, f func(Card) bool) []Card {
	var filtered []Card
	for _, v := range cards {
		if f(v) {
			filtered = append(filtered, v)
		}
	}
	return filtered
}

// MoveCard removes <card> from <fromDeck> and appends to <toDeck>
func MoveCard(card Card, fromDeck []Card, toDeck []Card) ([]Card, []Card, error) {
	var newFromDeck []Card
	for _, deckCard := range fromDeck {
		if !reflect.DeepEqual(card, deckCard) {
			newFromDeck = append(newFromDeck, deckCard)
		}
	}
	if len(newFromDeck) == len(fromDeck) {
		return []Card{}, []Card{}, errors.New("Card does not exist in fromDeck")
	}
	newToDeck := append(toDeck, card)
	return newFromDeck, newToDeck, nil
}