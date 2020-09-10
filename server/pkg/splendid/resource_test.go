package splendid

import (
	"reflect"
	"testing"
)

func TestMoveResources(t *testing.T) {
	fromBank := map[Resource]int{Black: 5, Red: 5, Blue: 5, Green: 5, White: 5, Yellow: 8}
	toBank := map[Resource]int{Black: 5, Red: 5, Blue: 5, Green: 5, White: 5, Yellow: 8}

	cost1 := map[Resource]int{Black: 3, Red: 1}
	expFromBank := map[Resource]int{Black: 2, Red: 4, Blue: 5, Green: 5, White: 5, Yellow: 8}
	expToBank := map[Resource]int{Black: 8, Red: 6, Blue: 5, Green: 5, White: 5, Yellow: 8}
	recFromBank, recToBank, _ := MoveResources(fromBank, toBank, cost1)
	if !reflect.DeepEqual(expFromBank, recFromBank) {
		t.Errorf("unexpected fromBank.  Rec: %v exp: %v", recFromBank, expFromBank)
	}
	if !reflect.DeepEqual(expToBank, recToBank) {
		t.Errorf("unexpected toBank.  Rec: %v exp: %v", recToBank, expToBank)
	}

	cost2 := map[Resource]int{Black: 6, Red: 1}
	_, _, err := MoveResources(fromBank, toBank, cost2)
	if err == nil {
		t.Errorf("no can't afford error")
	}

}
