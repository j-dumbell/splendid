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

func TestCreateCard(t *testing.T) {
	csvRow := []string{"1", "Black", "0", "0", "1", "1", "1", "1"}

	expectedCard := Card{
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
	}

	if !reflect.DeepEqual(CreateCard(csvRow, 0), expectedCard) {
		t.Fail()
	}
}
