package splendid

import (
	"reflect"
	"testing"
)

func TestMaskCards(t *testing.T) {
	input := []card{{ID: 1}, {ID: 2}, {ID: 3}}
	actual := maskCards(input)
	expected := []card{{}, {}, {}}
	if !reflect.DeepEqual(expected, actual) {
		t.Fatalf("actual not expected \nActual: %v \n Expected: %v", actual, expected)
	}
	if reflect.DeepEqual(input, expected) {
		t.Fatalf("original mutated")
	}
}

func TestMaskDecks(t *testing.T) {
	deck1 := []card{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {ID: 5}, {ID: 6}}
	deck2 := []card{{ID: 7}, {ID: 8}, {ID: 9}}
	deck3 := []card{{ID: 10}}
	decks := map[int][]card{1: deck1, 2: deck2, 3: deck3}

	expDeck1 := []card{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {}, {}}
	expDeck2 := []card{{ID: 7}, {ID: 8}, {ID: 9}}
	expDeck3 := []card{{ID: 10}}
	expectedDecks := map[int][]card{1: expDeck1, 2: expDeck2, 3: expDeck3}

	actual := maskDecks(decks)
	if !reflect.DeepEqual(expectedDecks, actual) {
		t.Fatalf("actual not expected \nActual: %v \n Expected: %v", actual, expectedDecks)
	}
	if reflect.DeepEqual(actual, decks) {
		t.Fatalf("original mutated %v", decks)
	}
}
