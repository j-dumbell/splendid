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

func TestGame_BuyCard(t *testing.T) {
	p1 := Player{Name: "Van", Bank: map[Resource]int{Blue: 3, Red: 3, Black: 3, Green: 3, White: 3}}
	p2 := Player{Name: "James"}
	deck1 := []Card{{ID: 1}, {ID: 2}, {ID: 3}}
	deck2 := []Card{{ID: 4}, {ID: 5}, {ID: 6, Cost: map[Resource]int{Blue: 2, Red: 1}}}
	deck3 := []Card{{ID: 7}, {ID: 8}, {ID: 9}}
	decks := map[int][]Card{1: deck1, 2: deck2, 3: deck3}
	bank := map[Resource]int{Blue: 5, Red: 5, Black: 5, Green: 5, White: 5}
	board := Board{Decks: decks, Bank: bank}
	g := Game{Players: []Player{p1, p2}, ActivePlayerIndex: 0, Board: board}
	g1 := g
	g2 := g

	err1 := g1.BuyCard("Tom", 2, 2)
	if err1.Error() != "not active player" || !reflect.DeepEqual(g1, g) {
		t.Fail()
	}

	g2.BuyCard("Van", 6, 2)
	expGBank := map[Resource]int{Blue: 7, Red: 6, Black: 5, Green: 5, White: 5}
	expPBank := map[Resource]int{Blue: 1, Red: 2, Black: 3, Green: 3, White: 3}
	if !(reflect.DeepEqual(g2.Board.Bank, expGBank) && reflect.DeepEqual(g2.Players[0].Bank, expPBank)) {
		t.Fail()
	}
}

func TestGame_NextPlayer(t *testing.T) {
	players := []Player{{Name: "Van"}, {Name: "James"}}
	g1 := Game{Players: players, ActivePlayerIndex: 0, Turn: 1}
	g1.NextPlayer()
	if g1.ActivePlayerIndex != 1 || g1.Turn != 1 {
		t.Fail()
	}

	g2 := Game{Players: players, ActivePlayerIndex: 1, Turn: 1}
	g2.NextPlayer()
	if g2.ActivePlayerIndex != 0 || g2.Turn != 2 {
		t.Fail()
	}

}