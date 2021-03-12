package splendid

import (
	"reflect"
	"testing"
)

func TestCountPurchased(t *testing.T) {
	type testConfig struct {
		input    Cards
		expected map[resource]int
	}

	configs := []testConfig{
		{
			input:    Cards{{Income: Red}, {Income: Green}, {Income: Blue}, {Income: Blue}},
			expected: map[resource]int{Red: 1, Blue: 2, Green: 1, Yellow: 0, Black: 0, White: 0},
		},
		{
			input:    Cards{{Income: Red}, {Income: Red}, {Income: Red}},
			expected: map[resource]int{Red: 3, Blue: 0, Green: 0, Yellow: 0, Black: 0, White: 0},
		},
		{
			input:    Cards{},
			expected: map[resource]int{Red: 0, Blue: 0, Green: 0, Yellow: 0, Black: 0, White: 0},
		},
	}
	for _, cfg := range configs {
		actual := countPurchased(cfg.input)
		if !reflect.DeepEqual(actual, cfg.expected) {
			t.Errorf("actual != expected \nActual:\n%v\nExpected:\n%v", actual, cfg.expected)
		}
	}
}

type calcResConfig struct {
	input    [2]map[resource]int
	expected map[resource]int
}

func TestAddResources(t *testing.T) {
	configs := []calcResConfig{
		{
			input: [2]map[resource]int{
				{Red: 1, Blue: 2, Green: 1, Yellow: 0, Black: 0, White: 0},
				{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 1, White: 1},
			},
			expected: map[resource]int{Red: 2, Blue: 4, Green: 1, Yellow: 0, Black: 1, White: 1},
		},
		{
			input: [2]map[resource]int{
				{Red: 1, Blue: 2, Green: 1, Yellow: 0, Black: 0, White: 0},
				{Red: 0, Blue: 1, Green: 0, Yellow: 0, Black: 1, White: 0},
			},
			expected: map[resource]int{Red: 1, Blue: 3, Green: 1, Yellow: 0, Black: 1, White: 0},
		},
	}

	for _, cfg := range configs {
		actual := addResources(cfg.input[0], cfg.input[1])
		if !reflect.DeepEqual(actual, cfg.expected) {
			t.Errorf("actual != expected \nActual:\n%v\nExpected:\n%v", actual, cfg.expected)
		}
	}
}

func TestSubtractResources(t *testing.T) {
	configs := []calcResConfig{
		{
			input: [2]map[resource]int{
				{Red: 1, Blue: 2, Green: 1, Yellow: 0, Black: 0, White: 0},
				{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 1, White: 1},
			},
			expected: map[resource]int{Red: 0, Blue: 0, Green: 1, Yellow: 0, Black: -1, White: -1},
		},
		{
			input: [2]map[resource]int{
				{Red: 1, Blue: 2, Green: 1, Yellow: 0, Black: 0, White: 0},
				{Red: 0, Blue: 1, Green: 0, Yellow: 0, Black: 1, White: 0},
			},
			expected: map[resource]int{Red: 1, Blue: 1, Green: 1, Yellow: 0, Black: -1, White: 0},
		},
	}

	for _, cfg := range configs {
		actual := subtractResources(cfg.input[0], cfg.input[1])
		if !reflect.DeepEqual(actual, cfg.expected) {
			t.Errorf("actual != expected \nActual:\n%v\nExpected:\n%v", actual, cfg.expected)
		}
	}
}

func TestAmountPayable(t *testing.T) {
	type testConfig struct {
		input    [3]map[resource]int
		expected map[resource]int
	}

	configs := []testConfig{
		{
			input: [3]map[resource]int{
				{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 0, White: 0, Yellow: 1},
				{Red: 3, Blue: 2, Green: 0, Yellow: 0, Black: 1, White: 0},
				{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 1, White: 1},
			},
			expected: map[resource]int{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 0, White: 0, Yellow: 1},
		},
		{
			input: [3]map[resource]int{
				{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 0, White: 0, Yellow: 3},
				{Red: 0, Blue: 0, Green: 1, Yellow: 0, Black: 1, White: 0},
				{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 1, White: 0},
			},
			expected: map[resource]int{Red: 1, Blue: 2, Green: 0, Yellow: 0, Black: 0, White: 0, Yellow: 0},
		},
	}

	for _, cfg := range configs {
		actual, _ := amountPayable(cfg.input[0], cfg.input[1], cfg.input[2])
		if !reflect.DeepEqual(actual, cfg.expected) {
			t.Errorf("actual != expected \nActual:\n%v\nExpected:\n%v", actual, cfg.expected)
		}
	}
}

func TestWinner(t *testing.T) {
	type testConfig struct {
		input    []Player
		expected int
	}

	configs := []testConfig{
		{
			input: []Player{
				{ID: 1, Purchased: Cards{{Points: 10}, {Points: 3}}, Elites: []elite{{Points: 2}}},
				{ID: 2, Purchased: Cards{{Points: 3}}},
			},
			expected: 1,
		},
		{
			input: []Player{
				{ID: 1, Purchased: Cards{{Points: 10}, {Points: 3}, {Points: 3}}},
				{ID: 2, Purchased: Cards{{Points: 3}, {Points: 13}}},
			},
			expected: 2,
		},
	}

	for _, tc := range configs {
		if actual := winnerID(tc.input); actual != tc.expected {
			t.Fatalf("unexpected winner.  Actual: %v, Expected: %v", actual, tc.expected)
		}
	}
}

func TestVisibleCards(t *testing.T) {
	type testConfig struct {
		input    Cards
		expected Cards
	}

	testConfigs := []testConfig{
		{
			input:    Cards{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {ID: 5}, {ID: 6}},
			expected: Cards{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}},
		},
		{
			input:    Cards{{ID: 1}, {ID: 2}, {ID: 3}},
			expected: Cards{{ID: 1}, {ID: 2}, {ID: 3}},
		},
	}
	for _, tc := range testConfigs {
		if actual := visibleCards(tc.input); !reflect.DeepEqual(actual, tc.expected) {
			t.Fatalf("actual != expected. \nActual: \n%v \nExpected: \n%v", actual, tc.expected)
		}
	}
}

func TestCanAfford(t *testing.T) {
	type testConfig struct {
		buyer    map[resource]int
		cost     map[resource]int
		expected bool
	}
	testConfigs := []testConfig{
		{
			buyer:    createEmptyBank(),
			cost:     map[resource]int{Red: 2},
			expected: false,
		},
		{
			buyer:    map[resource]int{Red: 3, Blue: 2, Green: 4},
			cost:     map[resource]int{Red: 2, Blue: 1},
			expected: true,
		},
	}
	for _, tc := range testConfigs {
		if actual := canAfford(tc.buyer, tc.cost); actual != tc.expected {
			t.Fail()
		}
	}
}

func TestCountResources(t *testing.T) {
	type testConfig struct {
		input    map[resource]int
		expected int
	}
	testConfigs := []testConfig{
		{input: map[resource]int{Red: 3, Blue: 2, Green: 4}, expected: 9},
		{input: map[resource]int{Yellow: 8, Blue: 5}, expected: 13},
	}
	for _, tc := range testConfigs {
		if actual := countResources(tc.input); actual != tc.expected {
			t.Fatalf("actual != expected \nActual: %v \nExpected: %v", actual, tc.expected)
		}
	}
}
