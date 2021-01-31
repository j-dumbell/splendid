package splendid

import (
	"reflect"
	"testing"

	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
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

func TestNewBoard(t *testing.T) {
	deck1 := []Card{{ID: 1}}
	elites := []Elite{{ID: 1}, {ID: 2}}
	gc := config.GameConfig{ElitesCount: 1, ResourceCount: 2}
	result := NewBoard(map[int][]Card{1: deck1}, elites, gc)
	if len(result.Elites) != gc.ElitesCount {
		t.Fatalf("unexpected number of elites \nExpected: %v \nActual %v", gc.ElitesCount, result.Elites)
	}
	if result.Bank[Black] != gc.ResourceCount {
		t.Fatalf("unexpected resource count \nExpected: %v \nActual %v", gc.ResourceCount, result.Bank[Black])
	}
}

func TestGetCard(t *testing.T) {
	deck1 := []Card{{ID: 0}, {ID: 1}, {ID: 2}, {ID: 3}}
	deck2 := []Card{{ID: 4}, {ID: 5}, {ID: 6}}
	deck3 := []Card{{ID: 7}}
	decks := map[int][]Card{1: deck1, 2: deck2, 3: deck3}

	rec, _ := GetCard(decks, 6)
	if !reflect.DeepEqual(Card{ID: 6}, rec) {
		t.Fail()
	}

	_, err := GetCard(decks, 10)
	if err == nil {
		t.Fail()
	}
}
