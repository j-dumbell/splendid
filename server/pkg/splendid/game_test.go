package splendid

import (
	"reflect"
	"testing"
)

func TestGame_AddPlayer(t *testing.T) {
	p1 := Player{Name: "Van"}
	p2 := Player{Name: "James"}
	g := Game{Players: []Player{p1}}

	g1 := g
	g1.AddPlayer(p2, 4)
	if !reflect.DeepEqual(g1.Players, []Player{p1, p2}) {
		t.Fail()
	}

	g2 := g
	err := g2.AddPlayer(p2, 1)
	if err == nil {
		t.Fail()
	}
}

func TestGame_SetFirstPlayer(t *testing.T) {
	p1 := Player{Name: "Van"}
	p2 := Player{Name: "James"}
	g := Game{Players: []Player{p1, p2}}
	g.SetFirstPlayer(1)
	if !reflect.DeepEqual(g.ActivePlayer, &p2) {
		t.Fail()
	}
}

//func TestGame_BuyCard(t *testing.T) {
//	p1 := Player{Name: "Van"}
//	g := Game{Players: []Player{p1}, ActivePlayer: &p1}
//
//	err1 := g.BuyCard("James", 2, 2)
//	if err1.Error() != "not active player" {
//		t.Fail()
//	}
//
//}