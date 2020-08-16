package splendid

import (
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
