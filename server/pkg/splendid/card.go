package splendid

import (
	"errors"
	"reflect"

	"github.com/j-dumbell/splendid/server/pkg/util"
)

type card struct {
	ID     int              `json:"id"`
	Tier   int              `json:"tier"`
	Points int              `json:"points"`
	Cost   map[resource]int `json:"cost"`
	Income resource         `json:"income"`
}

func createCards(rows [][]string) []card {
	var cards []card
	for i, row := range rows {
		cards = append(cards, card{
			ID:     i + 1,
			Tier:   util.StringToInt(row[0]),
			Points: util.StringToInt(row[2]),
			Cost: map[resource]int{
				Black: util.StringToInt(row[3]),
				White: util.StringToInt(row[4]),
				Red:   util.StringToInt(row[5]),
				Blue:  util.StringToInt(row[6]),
				Green: util.StringToInt(row[7]),
			},
			Income: mapResource(row[1]),
		})
	}
	return cards
}

// FilterCards returns a slice of Card structs that pass the
// test implemented by the provided function
func filterCards(cards []card, f func(card) bool) []card {
	var filtered []card
	for _, v := range cards {
		if f(v) {
			filtered = append(filtered, v)
		}
	}
	return filtered
}

// MoveCard removes <card> from <fromDeck> and appends to <toDeck>
func moveCard(c card, fromDeck []card, toDeck []card) ([]card, []card, error) {
	var newFromDeck []card
	for _, deckCard := range fromDeck {
		if !reflect.DeepEqual(c, deckCard) {
			newFromDeck = append(newFromDeck, deckCard)
		}
	}
	if len(newFromDeck) == len(fromDeck) {
		return []card{}, []card{}, errors.New("card does not exist in fromDeck")
	}
	newToDeck := append(toDeck, c)
	return newFromDeck, newToDeck, nil
}
