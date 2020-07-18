package splendid

import (
	"reflect"
	"testing"
)

func TestShuffle(t *testing.T) {
	shuffledInt := Shuffle([]int{1, 2, 3}, 1)
	if !reflect.DeepEqual([]int{1, 2, 3}, shuffledInt) {
		t.Fail()
	}

	shuffledString := Shuffle([]string{"a", "b", "c"}, 100)
	if !reflect.DeepEqual([]string{"b", "c", "a"}, shuffledString) {
		t.Fail()
	}
}
