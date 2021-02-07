package splendid

import (
	"reflect"
	"testing"
)

func TestFilter(t *testing.T) {
	cards := Cards{{ID: 1}, {ID: 2}, {ID: 3}}
	f := func(c Card) bool { return c.ID == 1 || c.ID == 2 }

	actual := cards.filter(f)
	expected := Cards{{ID: 1}, {ID: 2}}
	if !reflect.DeepEqual(expected, actual) {
		t.Fatalf("Actual: %v. Expected: %v", actual, expected)
	}

	original := Cards{{ID: 1}, {ID: 2}, {ID: 3}}
	if !reflect.DeepEqual(cards, original) {
		t.Fatalf("original Cards mutated. Actual: %v. Original: %v", cards, original)
	}
}

func TestApply(t *testing.T) {
	cards := Cards{{ID: 1}, {ID: 2}, {ID: 3}}
	f := func(c Card) Card { return Card{ID: c.ID * 10} }

	actual := cards.apply(f)
	expected := Cards{{ID: 10}, {ID: 20}, {ID: 30}}
	if !reflect.DeepEqual(expected, actual) {
		t.Fatalf("Actual: %v. Expected: %v", actual, expected)
	}

	original := Cards{{ID: 1}, {ID: 2}, {ID: 3}}
	if !reflect.DeepEqual(cards, original) {
		t.Fatalf("original Cards mutated. Actual: %v. Original: %v", cards, original)
	}
}

func TestCreateCards(t *testing.T) {
	csvRows := [][]string{
		{"1", "black", "0", "0", "1", "1", "1", "1"},
		{"2", "red", "1", "1", "1", "1", "0", "0"},
	}

	expectedCards := Cards{
		{
			ID:     1,
			Tier:   1,
			Points: 0,
			Cost:   map[resource]int{Black: 0, White: 1, Red: 1, Blue: 1, Green: 1},
			Income: mapResource("black"),
		},
		{
			ID:     2,
			Tier:   2,
			Points: 1,
			Cost:   map[resource]int{Black: 1, White: 1, Red: 1, Blue: 0, Green: 0},
			Income: mapResource("red"),
		},
	}

	if !reflect.DeepEqual(createCards(csvRows), expectedCards) {
		t.Fail()
	}
}

func TestMoveCard(t *testing.T) {
	fromDeck := Cards{{ID: 1}, {ID: 2}, {ID: 3}}
	toDeck := Cards{{ID: 4}, {ID: 5}, {ID: 6}}
	expFromDeck := Cards{{ID: 2}, {ID: 3}}
	expToDeck := Cards{{ID: 4}, {ID: 5}, {ID: 6}, {ID: 1}}
	recFromDeck, recToDeck, _ := moveCard(Card{ID: 1}, fromDeck, toDeck)
	if !(reflect.DeepEqual(recFromDeck, expFromDeck) && reflect.DeepEqual(expToDeck, recToDeck)) {
		t.Fail()
	}
	_, _, err := moveCard(Card{ID: 10}, fromDeck, toDeck)
	if err == nil {
		t.Fail()
	}
}
