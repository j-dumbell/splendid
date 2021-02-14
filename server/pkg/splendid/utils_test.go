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
