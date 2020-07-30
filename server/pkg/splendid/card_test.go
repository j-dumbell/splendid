package splendid

import (
	"reflect"
	"testing"
)

func TestFilterCards(t *testing.T) {
	cards := []Card{
		Card{
			Id: 1,
			Tier: 1,
			Points: 10,
			Cost: map[Resource]int{Blue: 1},
			Income: Black,
			IsPublic: true,
		},
		Card{
			Id: 1,
			Tier: 2,
			Points: 10,
			Cost: map[Resource]int{Blue: 1},
			Income: Green,
			IsPublic: true,
		},
	}

	f := func(c Card) bool {
		return c.Tier==1
	}

	if !reflect.DeepEqual([]Card{cards[0]}, FilterCards(cards, f)) {
		t.Fail()
	}
}
