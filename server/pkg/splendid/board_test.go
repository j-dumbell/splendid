package splendid

import "testing"

func TestFilterFn(t *testing.T) {
	i := 1
	card := Card{
		ID: 1,
		Tier: 1,
		Points: 1,
		Cost: map[Resource]int{Black: 1},
	}
	filter1 := FilterFn(i)
	if !filter1(card) {
		t.Fail()
	}
}