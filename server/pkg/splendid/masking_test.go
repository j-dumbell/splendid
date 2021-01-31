package splendid

import (
	"reflect"
	"testing"
)

func TestMaskDecks(t *testing.T) {
	deck1 := []card{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {ID: 5}, {ID: 6}}
	deck2 := []card{{ID: 7}, {ID: 8}, {ID: 9}}
	deck3 := []card{{ID: 10}}
	decks := map[int][]card{1: deck1, 2: deck2, 3: deck3}

	expDeck1 := []card{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {}, {}}
	expDeck2 := []card{{ID: 7}, {ID: 8}, {ID: 9}}
	expDeck3 := []card{{ID: 10}}
	expectedDecks := map[int][]card{1: expDeck1, 2: expDeck2, 3: expDeck3}

	rec := maskDecks(decks)
	if !reflect.DeepEqual(expectedDecks, rec) {
		t.Fail()
	}
}
