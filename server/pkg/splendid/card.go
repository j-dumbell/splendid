package splendid

import (
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

func createCards(rows [][]string) (cards Cards) {
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

func (cards *Cards) filter(f func(Card) bool) (filtered Cards) {
	for _, v := range *cards {
		if f(v) {
			filtered = append(filtered, v)
		}
	}
	return filtered
}

func (cards *Cards) apply(f func(Card) Card) Cards {
	mapped := Cards{}
	for _, v := range *cards {
		mapped = append(mapped, f(v))
	}
	return mapped
}

func (cards *Cards) find(f func(Card) bool) (Card, bool) {
	for _, c := range *cards {
		if f(c) {
			return c, true
		}
	}
	return Card{}, false
}
