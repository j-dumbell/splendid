package splendid

type Card struct {
	Id       int
	Tier	int
	Points   int
	Cost     map[Resource]int
	Income   Resource
	IsPublic bool
}

func FilterCards(cards []Card, f func(Card) bool) []Card {
	var filtered []Card
	for _, v := range cards {
		if f(v) {
			filtered = append(filtered, v)
		}
	}
	return filtered
}

