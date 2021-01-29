package splendid

import (
	"reflect"
	"testing"
)

func TestFilterCards(t *testing.T) {
	cards := []Card{
		{
			ID:     1,
			Tier:   1,
			Points: 10,
			Cost:   map[Resource]int{Blue: 1},
			Income: Black,
		},
		{
			ID:     1,
			Tier:   2,
			Points: 10,
			Cost:   map[Resource]int{Blue: 1},
			Income: Green,
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
		{"1", "black", "0", "0", "1", "1", "1", "1"},
		{"2", "red", "1", "1", "1", "1", "0", "0"},
	}

	expectedCards := []Card{
		{
			ID:     1,
			Tier:   1,
			Points: 0,
			Cost:   map[Resource]int{Black: 0, White: 1, Red: 1, Blue: 1, Green: 1},
			Income: MapResource("black"),
		},
		{
			ID:     2,
			Tier:   2,
			Points: 1,
			Cost:   map[Resource]int{Black: 1, White: 1, Red: 1, Blue: 0, Green: 0},
			Income: MapResource("red"),
		},
	}

	if !reflect.DeepEqual(CreateCards(csvRows), expectedCards) {
		t.Fail()
	}
}

func TestMoveCard(t *testing.T) {
	fromDeck := []Card{{ID: 1}, {ID: 2}, {ID: 3}}
	toDeck := []Card{{ID: 4}, {ID: 5}, {ID: 6}}
	expFromDeck := []Card{{ID: 2}, {ID: 3}}
	expToDeck := []Card{{ID: 4}, {ID: 5}, {ID: 6}, {ID: 1}}
	recFromDeck, recToDeck, _ := MoveCard(Card{ID: 1}, fromDeck, toDeck)
	if !(reflect.DeepEqual(recFromDeck, expFromDeck) && reflect.DeepEqual(expToDeck, recToDeck)) {
		t.Fail()
	}
	_, _, err := MoveCard(Card{ID: 10}, fromDeck, toDeck)
	if err == nil {
		t.Fail()
	}
}
