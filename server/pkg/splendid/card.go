package splendid

import "github.com/j-dumbell/splendid/server/pkg/util"

// Card represents a development card
type Card struct {
	ID       int
	Tier     int
	Points   int
	Cost     map[*Resource]int
	Income   *Resource
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
			Cost: map[*Resource]int{
				&Black: util.StringToInt(row[3]),
				&White: util.StringToInt(row[4]),
				&Red:   util.StringToInt(row[5]),
				&Blue:  util.StringToInt(row[6]),
				&Green: util.StringToInt(row[7]),
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
