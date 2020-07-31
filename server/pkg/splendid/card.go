package splendid

// Card represents a development card
type Card struct {
	ID       int
	Tier     int
	Points   int
	Cost     map[Resource]int
	Income   Resource
	IsPublic bool
}

func createCard(row []string, i int) Card {
	return Card{
		ID:     i + 1,
		Tier:   StringToInt(row[0]),
		Points: StringToInt(row[2]),
		Cost: map[Resource]int{
			Black: StringToInt(row[3]),
			White: StringToInt(row[4]),
			Red:   StringToInt(row[5]),
			Blue:  StringToInt(row[6]),
			Green: StringToInt(row[7]),
		},
		Income:   MapResource(row[1]),
		IsPublic: false,
	}
}

// CreateCards creates a list of Card structs from CSV data
func CreateCards(rows [][]string) []Card {
	var cards []Card
	for i, row := range rows {
		cards = append(cards, createCard(row, i))
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
