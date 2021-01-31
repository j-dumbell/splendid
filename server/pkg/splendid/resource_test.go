package splendid

import (
	"reflect"
	"testing"
)

func TestMoveResources(t *testing.T) {
	fromBank := map[resource]int{Black: 5, Red: 5, Blue: 5, Green: 5, White: 5, Yellow: 8}
	toBank := map[resource]int{Black: 5, Red: 5, Blue: 5, Green: 5, White: 5, Yellow: 8}

	cost1 := map[resource]int{Black: 3, Red: 1}
	expFromBank := map[resource]int{Black: 2, Red: 4, Blue: 5, Green: 5, White: 5, Yellow: 8}
	expToBank := map[resource]int{Black: 8, Red: 6, Blue: 5, Green: 5, White: 5, Yellow: 8}
	recFromBank, recToBank, _ := moveResources(fromBank, toBank, cost1)
	if !reflect.DeepEqual(expFromBank, recFromBank) {
		t.Errorf("unexpected fromBank.  Rec: %v exp: %v", recFromBank, expFromBank)
	}
	if !reflect.DeepEqual(expToBank, recToBank) {
		t.Errorf("unexpected toBank.  Rec: %v exp: %v", recToBank, expToBank)
	}

	cost2 := map[resource]int{Black: 6, Red: 1}
	_, _, err := moveResources(fromBank, toBank, cost2)
	if err == nil {
		t.Errorf("expect error, nil returned")
	}
}
