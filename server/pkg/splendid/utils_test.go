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
