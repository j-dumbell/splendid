package splendid

import (
	"reflect"
	"testing"
)

func TestFilterFn(t *testing.T) {
	i := 1
	card := Card{
		ID:     1,
		Tier:   1,
		Points: 1,
		Cost:   map[Resource]int{Black: 1},
	}
	filter1 := FilterFn(i)
	if !filter1(card) {
		t.Fail()
	}
}

func isBoard(t interface{}) bool {
	switch t.(type) {
	case Board:
		return true
	default:
		return false
	}
}

func TestNewBoard(t *testing.T) {
	deck := []Card{
		{
			ID:     1,
			Tier:   1,
			Points: 1,
			Cost:   map[Resource]int{Black: 1},
		},
	}

	result := NewBoard(
		map[int][]Card{1: deck},
		[]Elite{
			{
				ID:     1,
				Points: 3,
				Cost:   map[Resource]int{Black: 0, White: 0, Red: 4, Blue: 0, Green: 4},
			},
		},
	)

	if !isBoard(result) {
		t.Fail()
	}
}

func TestVisibleDeckCards(t *testing.T) {
	deck1 := []Card{{ID: 0}, {ID: 1}, {ID: 3}, {ID: 4}}
	deck2 := []Card{{ID: 5}, {ID: 6}, {ID: 7}}
	deck3 := []Card{{ID: 8}}
	decks := map[int][]Card{1: deck1, 2: deck2, 3: deck3}

	expDeck1 := []Card{{ID: 3}, {ID: 4}}
	expDeck2 := []Card{{ID: 1}, {ID: 2}}
	expDeck3 := []Card{{ID: 0}}
	expectedDecks := map[int][]Card{1: expDeck1, 2: expDeck2, 3: expDeck3}

	rec, _ := VisibleDeckCards(decks, 2)
	if !reflect.DeepEqual(expectedDecks, rec) {
		t.Fail()
	}

}

func TestGetCard(t *testing.T) {
	deck1 := []Card{{ID: 0}, {ID: 1}, {ID: 3}, {ID: 4}}
	deck2 := []Card{{ID: 5}, {ID: 6}, {ID: 7}}
	deck3 := []Card{{ID: 8}}
	decks := map[int][]Card{1: deck1, 2: deck2, 3: deck3}

	rec, _ := GetCard(decks, 6, 2)
	if !reflect.DeepEqual(Card{ID: 6}, rec) {
		t.Fail()
	}

	_, err := GetCard(decks, 10, 2)
	if err != nil {
		t.Fail()
	}
}
