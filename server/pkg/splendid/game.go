package splendid

import (
	"errors"
	"math/rand"
)

// Game represents the state of a current game
type Game struct {
	Players      []Player
	ActivePlayer Player
	Board        Board
}

func AddPlayer(game Game, player Player, max int) (Game, error) {
	if len(game.Players) >= max {
		return Game{}, errors.New("game full")
	}
	game.Players = append(game.Players, player)
	return game, nil
}

func UpdateBoard(game Game, board Board) (Game) {
	game.Board = board
	return game
}

func FirstPlayer(game Game) Game {
	players := game.Players
	index := rand.Intn(len(players))
	game.ActivePlayer = players[index]
	return game
}