package splendid

import (
	"reflect"
	"testing"
)

func decksFixture() map[int]Cards {
	deck1 := Cards{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {ID: 5}, {ID: 6}}
	deck2 := Cards{{ID: 7}, {ID: 8}, {ID: 9}}
	deck3 := Cards{{ID: 10}}
	return map[int]Cards{1: deck1, 2: deck2, 3: deck3}
}

func playersFixture() []Player {
	player1 := Player{ID: 1, ReservedHidden: Cards{{ID: 1}, {ID: 2}}}
	player2 := Player{ID: 2, ReservedHidden: Cards{{ID: 3}, {ID: 4}}}
	return []Player{player1, player2}
}

func TestMaskCards(t *testing.T) {
	input := Cards{{ID: 1}, {ID: 2}, {ID: 3}}
	actual := maskCards(input)
	expected := Cards{{}, {}, {}}
	if !reflect.DeepEqual(expected, actual) {
		t.Fatalf("actual not expected \nActual: %v \n Expected: %v", actual, expected)
	}
	if reflect.DeepEqual(input, expected) {
		t.Fatalf("original mutated")
	}
}

func TestMaskDecks(t *testing.T) {
	decks := decksFixture()

	expDeck1 := Cards{{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {}, {}}
	expDeck2 := Cards{{ID: 7}, {ID: 8}, {ID: 9}}
	expDeck3 := Cards{{ID: 10}}
	expectedDecks := map[int]Cards{1: expDeck1, 2: expDeck2, 3: expDeck3}

	actual := maskDecks(decks)
	if !reflect.DeepEqual(expectedDecks, actual) {
		t.Fatalf("actual decks not expected \nActual: %v \n Expected: %v", actual, expectedDecks)
	}
	if reflect.DeepEqual(actual, decks) {
		t.Fatalf("original decks mutated %v", decks)
	}
}

func TestMaskPlayerHands(t *testing.T) {
	players := playersFixture()

	expectedPlayer1 := Player{ID: 1, ReservedHidden: Cards{{ID: 1}, {ID: 2}}}
	expectedPlayer2 := Player{ID: 2, ReservedHidden: Cards{{}, {}}}
	expectedPlayers := []Player{expectedPlayer1, expectedPlayer2}

	actual := maskPlayerHands(players[0].ID, players)
	if !reflect.DeepEqual(expectedPlayers, actual) {
		t.Fatalf("actual players not expected \nActual: %v \n Expected: %v", actual, expectedPlayers)
	}
	if reflect.DeepEqual(actual, players) {
		t.Fatalf("original players mutated %v", players)
	}
}

func TestMaskGame(t *testing.T) {
	game := Game{
		Players: playersFixture(),
		Board: board{
			Decks: decksFixture(),
		},
	}

	expected := Game{
		Players: []Player{
			{ID: 1, ReservedHidden: Cards{{}, {}}},
			game.Players[1],
		},
		Board: board{
			Decks: map[int]Cards{
				1: {{ID: 1}, {ID: 2}, {ID: 3}, {ID: 4}, {}, {}},
				2: game.Board.Decks[2],
				3: game.Board.Decks[3],
			},
		},
	}

	actual := maskGame(2, game)
	if !reflect.DeepEqual(expected, actual) {
		t.Fatalf("unexpected game returned\nActual:\n%v\n Expected:\n%v", actual, expected)
	}
}
