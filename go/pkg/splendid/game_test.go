package splendid

import (
	"reflect"
	"testing"
)

func TestGame_AddPlayer(t *testing.T) {
	g := Game{Players: []Player{{ID: 1, Bank: createEmptyBank()}}}

	g1 := g
	g1.AddPlayer(2)
	expected := []Player{
		{ID: 1, Bank: createEmptyBank()},
		{ID: 2, Bank: createEmptyBank(), ReservedVisible: Cards{}, ReservedHidden: Cards{}, Purchased: Cards{}, Elites: []elite{}},
	}
	if !reflect.DeepEqual(g1.Players, expected) {
		t.Fatalf("unexpected players: \nExpected: %v \nReceived: %v", expected, g1.Players)
	}

	g2 := g
	err := g2.AddPlayer(1)
	if err == nil {
		t.Fatalf("error not thrown.  Player already in game")
	}
}

func TestGame_BuyCard(t *testing.T) {
	p1 := Player{ID: 1, Bank: map[resource]int{Blue: 3, Red: 3, Black: 3, Green: 3, White: 3}}
	p2 := Player{ID: 2}
	deck1 := Cards{{ID: 1}, {ID: 2}, {ID: 3}}
	deck2 := Cards{{ID: 4}, {ID: 5}, {ID: 6, Cost: map[resource]int{Blue: 2, Red: 1}}}
	deck3 := Cards{{ID: 7}, {ID: 8}, {ID: 9}}
	decks := map[int]Cards{1: deck1, 2: deck2, 3: deck3}
	bank := map[resource]int{Blue: 5, Red: 5, Black: 5, Green: 5, White: 5}
	board := board{Decks: decks, Bank: bank}
	g := Game{Players: []Player{p1, p2}, ActivePlayerIndex: 0, Board: board}
	g2 := g

	if err := g2.buyCard(6, map[resource]int{Blue: 2, Red: 1}); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	expGBank := map[resource]int{Blue: 7, Red: 6, Black: 5, Green: 5, White: 5, Yellow: 0}
	expPBank := map[resource]int{Blue: 1, Red: 2, Black: 3, Green: 3, White: 3, Yellow: 0}
	if !(reflect.DeepEqual(g2.Board.Bank, expGBank)) {
		t.Fatalf("incorrect game bank: \nActual: %v \nExpected: %v", g2.Board.Bank, expGBank)
	}
	if !reflect.DeepEqual(g2.Players[0].Bank, expPBank) {
		t.Fatalf("incorrect player bank: \nActual: %v \nExpected: %v", g2.Players[0].Bank, expPBank)
	}
}

func TestGame_endTurn(t *testing.T) {
	players := []Player{{ID: 1}, {ID: 2}}
	g1 := Game{Players: players, ActivePlayerIndex: 0, Turn: 1}
	g1.endTurn()
	if g1.ActivePlayerIndex != 1 || g1.Turn != 1 {
		t.Fail()
	}

	g2 := Game{Players: players, ActivePlayerIndex: 1, Turn: 1}
	g2.endTurn()
	if g2.ActivePlayerIndex != 0 || g2.Turn != 2 {
		t.Fail()
	}

}

func TestGame_ReserveHidden(t *testing.T) {
	b := board{
		Bank:  map[resource]int{Blue: 0, Red: 0, Black: 0, Green: 0, White: 0, Yellow: 2},
		Decks: map[int]Cards{1: {{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {ID: 5}}},
	}
	g := Game{
		Players:           []Player{{ID: 1, Bank: createEmptyBank()}, {ID: 2}},
		ActivePlayerIndex: 0,
		Board:             b,
	}

	expBoard := board{
		Bank:  map[resource]int{Blue: 0, Red: 0, Black: 0, Green: 0, White: 0, Yellow: 1},
		Decks: map[int]Cards{1: {{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}}},
	}
	expG := Game{
		Players: []Player{
			{ID: 1, ReservedHidden: Cards{{ID: 5}}, Bank: map[resource]int{Blue: 0, Red: 0, Black: 0, Green: 0, White: 0, Yellow: 1}},
			{ID: 2},
		},
		ActivePlayerIndex: 0,
		Board:             expBoard,
	}
	err := g.reserveHidden(1)
	if err != nil {
		t.Fatalf("unexpected error: \"%+v\"", err.Error())
	}
	if !reflect.DeepEqual(g, expG) {
		t.Fatalf("unexpected game:\nActual:\n%+v \nExpected:\n%+v", g, expG)
	}
}

func Test_validateTake(t *testing.T) {
	inputOk := []map[resource]int{
		{Red: 1, Blue: 1, Green: 1, White: 0, Black: 0, Yellow: 0},
		{White: 0, Red: 0, Blue: 0, Green: 2, Black: 0, Yellow: 0},
	}
	bank := map[resource]int{Yellow: 3, Red: 3, Green: 3, White: 2, Black: 3, Blue: 3}

	for _, toTake := range inputOk {
		if err := validateTake(toTake, bank, 3); err != nil {
			t.Fatalf("input: %v \nunexpected error: \"%v\"", toTake, err)
		}
	}

	inputBad := []map[resource]int{
		{Yellow: 1, Red: 1, Green: 1, White: 0, Black: 0, Blue: 0},
		{Yellow: 2, Red: 0, Green: 0, White: 0, Black: 0, Blue: 0},
		{Red: 1, Green: 1, White: 1, Black: 1, Blue: 0, Yellow: 0},
		{Red: 3, Green: 2, White: 1, Black: 1, Blue: 0, Yellow: 0},
		{White: 2, Red: 0, Blue: 0, Green: 0, Black: 0, Yellow: 0},
	}
	for _, toTake := range inputBad {
		if err := validateTake(toTake, bank, 3); err == nil {
			t.Fatalf("input: %v \nerror not thrown", toTake)
		}
	}
}

func TestMoveElite(t *testing.T) {
	game := Game{
		Board: board{
			Elites: []elite{
				{ID: 1, Cost: map[resource]int{Blue: 1, Black: 1}},
				{ID: 2, Cost: map[resource]int{Black: 2}},
				{ID: 2, Cost: map[resource]int{Red: 1}},
			},
		},
		Players:           []Player{{ID: 1, Purchased: Cards{{ID: 1, Income: Black}, {ID: 2, Income: Black}, {ID: 3, Income: Blue}}}},
		ActivePlayerIndex: 0,
	}
	game.moveElite()
	expected := Game{
		Board: board{
			Elites: []elite{{ID: 2, Cost: map[resource]int{Red: 1}}},
		},
		Players: []Player{
			{
				ID:        1,
				Purchased: Cards{{ID: 1, Income: Black}, {ID: 2, Income: Black}, {ID: 3, Income: Blue}},
				Elites:    []elite{{ID: 1, Cost: map[resource]int{Blue: 1, Black: 1}}, {ID: 2, Cost: map[resource]int{Black: 2}}},
			},
		},
		ActivePlayerIndex: 0,
	}
	if !reflect.DeepEqual(game, expected) {
		t.Fatalf("actual != expected. \nActual\n%v \nExpected\n%v", game, expected)
	}
}

func TestReserveVisible(t *testing.T) {
	game := Game{
		Players: []Player{{ID: 1, Bank: map[resource]int{Yellow: 1}}},
		Board: board{
			Decks: map[int]Cards{1: Cards{{ID: 1}, {ID: 2, Tier: 1}}},
			Bank:  map[resource]int{Yellow: 2},
		},
		ActivePlayerIndex: 0,
	}
	expected := Game{
		Players: []Player{{ID: 1, ReservedVisible: Cards{{ID: 2, Tier: 1}}, Bank: map[resource]int{Yellow: 2}}},
		Board: board{
			Decks: map[int]Cards{1: Cards{{ID: 1}}},
			Bank:  map[resource]int{Yellow: 1},
		},
		ActivePlayerIndex: 0,
	}
	game.reserveVisible(2)
	if !reflect.DeepEqual(game, expected) {
		t.Fatalf("actual != expected \nActual: \n%+v \nExpected: \n%+v", game, expected)
	}
}
