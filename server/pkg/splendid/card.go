package splendid

import (
	"errors"
	"reflect"

	"github.com/j-dumbell/splendid/server/pkg/util"
)

type Card struct {
	ID     int              `json:"id"`
	Tier   int              `json:"tier"`
	Points int              `json:"points"`
	Cost   map[resource]int `json:"cost"`
	Income resource         `json:"income"`
}

type Cards []Card

func createCards(rows [][]string) (cards []Card) {
	for i, row := range rows {
		cards = append(cards, Card{
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
func filterCards(cards []Card, f func(Card) bool) (filtered []Card) {
	for _, v := range cards {
		if f(v) {
			filtered = append(filtered, v)
		}
	}
	return filtered
}

// MoveCard removes <card> from <fromDeck> and appends to <toDeck>
func moveCard(c Card, fromDeck, toDeck []Card) ([]Card, []Card, error) {
	var newFromDeck []Card
	for _, deckCard := range fromDeck {
		if !reflect.DeepEqual(c, deckCard) {
			newFromDeck = append(newFromDeck, deckCard)
		}
	}
	if len(newFromDeck) == len(fromDeck) {
		return []Card{}, []Card{}, errors.New("card does not exist in fromDeck")
	}
	newToDeck := append(toDeck, c)
	return newFromDeck, newToDeck, nil
}
