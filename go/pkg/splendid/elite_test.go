package splendid

import (
	"reflect"
	"testing"
)

func TestCreateElites(t *testing.T) {
	rows := [][]string{
		{"3", "0", "0", "4", "0", "4"},
		{"3", "3", "3", "3", "0", "0"},
	}
	expected := []elite{
		{
			ID:     1,
			Points: 3,
			Cost:   map[resource]int{Black: 0, White: 0, Red: 4, Blue: 0, Green: 4},
		},
		{
			ID:     2,
			Points: 3,
			Cost:   map[resource]int{Black: 3, White: 3, Red: 3, Blue: 0, Green: 0},
		},
	}
	if !reflect.DeepEqual(createElites(rows), expected) {
		t.Fail()
	}
}
