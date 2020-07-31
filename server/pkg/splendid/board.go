package splendid

import "github.com/j-dumbell/splendid/server/pkg/util"

type Board struct {
	Deck1  []Card
	Deck2  []Card
	Deck3  []Card
	Elites []Elite
	Bank   map[Resource]int
}

func FilterFn(tier int) func(c Card) bool {
	return func(c Card) bool {
		return c.Tier == tier
	}
}

func CreateDecks(cardsPath string, elitesPath string) ([]Card, []Card, []Card, []Elite) {
	cardRows, _ := util.ReadCSV(cardsPath)
	cards := CreateCards(cardRows)
	deck1 := FilterCards(cards, FilterFn(1))
	deck2 := FilterCards(cards, FilterFn(2))
	deck3 := FilterCards(cards, FilterFn(3))

	eliteRows, _ := util.ReadCSV(elitesPath)
	elites := CreateElites(eliteRows)

	return deck1, deck2, deck3, elites
}