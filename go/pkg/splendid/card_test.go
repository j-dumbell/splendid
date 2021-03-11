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

func TestFind(t *testing.T) {
	type testConfig struct {
		inputCards   Cards
		f            func(Card) bool
		expectedCard Card
		expectedBool bool
	}
	testConfigs := []testConfig{
		{
			inputCards:   Cards{{ID: 1}, {ID: 2}, {ID: 3}},
			f:            func(c Card) bool { return c.ID == 2 },
			expectedCard: Card{ID: 2},
			expectedBool: true,
		},
		{
			inputCards:   Cards{{ID: 1, Tier: 1}, {ID: 2, Tier: 1}, {ID: 3}},
			f:            func(c Card) bool { return c.Tier == 1 },
			expectedCard: Card{ID: 1, Tier: 1},
			expectedBool: true,
		},
	}
	for _, tc := range testConfigs {
		actual, exists := tc.inputCards.find(tc.f)
		if !reflect.DeepEqual(actual, tc.expectedCard) {
			t.Fatalf("actual != expected. \nActual \n%+v \nExpected \n%+v", actual, tc.expectedCard)
		}
		if exists != tc.expectedBool {
			t.Fail()
		}
	}
}
