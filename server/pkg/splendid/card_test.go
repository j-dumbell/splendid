package splendid

import (
	"reflect"
	"testing"
)

func TestFilterCards(t *testing.T) {
	cards := []Card{
		Card{
			ID:       1,
			Tier:     1,
			Points:   10,
			Cost:     map[Resource]int{Blue: 1},
			Income:   Black,
			IsPublic: true,
		},
		Card{
			ID:       1,
			Tier:     2,
			Points:   10,
			Cost:     map[Resource]int{Blue: 1},
			Income:   Green,
			IsPublic: true,
		},
	}

	f := func(c Card) bool {
		return c.Tier == 1
	}

	if !reflect.DeepEqual([]Card{cards[0]}, FilterCards(cards, f)) {
		t.Fail()
	}

	if reflect.DeepEqual([]Card{cards[1]}, FilterCards(cards, f)) {
		t.Fail()
	}
}

func TestCreateCards(t *testing.T) {
	csvRows := [][]string{
		{"1", "Black", "0", "0", "1", "1", "1", "1"},
		{"2", "Red", "1", "1", "1", "1", "0", "0"},
	}

	expectedCards := []Card{
		{
			ID:     1,
			Tier:   1,
			Points: 0,
			Cost: map[Resource]int{
				Black: 0,
				White: 1,
				Red:   1,
				Blue:  1,
				Green: 1,
			},
			Income:   MapResource("Black"),
			IsPublic: false,
		},
		{
			ID:     2,
			Tier:   2,
			Points: 1,
			Cost: map[Resource]int{
				Black: 1,
				White: 1,
				Red:   1,
				Blue:  0,
				Green: 0,
			},
			Income:   MapResource("Red"),
			IsPublic: false,
		},
	}

	if !reflect.DeepEqual(CreateCards(csvRows), expectedCards) {
		t.Fail()
	}
}
