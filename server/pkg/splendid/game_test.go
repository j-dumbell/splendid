package splendid

import (
	"reflect"
	"testing"
	"time"
)

func TestGame_AddPlayer(t *testing.T) {
	p1 := Player{Name: "Van"}
	p2 := Player{Name: "James"}
	g := Game{Players: []Player{p1}}

	g1 := g
	err1 := g1.AddPlayer(p2, 4)
	if !reflect.DeepEqual(g1.Players, []Player{p1, p2} {
		t.Fail()
	}

	g2 := g
	err2 := g2.AddPlayer(p2, 1)
	if err2 != "game full" {
		t.Fail()
	}
}

func TestGame_SetFirstPlayer(t *testing.T) {
	p1 := Player{Name: "Van"}
	p2 := Player{Name: "James"}
	g := Game{Players: []Player{p1, p2}}
	g.SetFirstPlayer(1)
	if g.ActivePlayer != p1 {
		t.Fail()
	}
}
