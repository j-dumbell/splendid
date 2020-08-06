package splendid

import (
	"errors"
	"fmt"
	"math/rand"
)

// Game represents the state of a current game
type Game struct {
	Players      []Player
	ActivePlayer Player
	Board        Board
}

// ddPlayer adds the provided player to game, as long as there's space
func (g *Game) AddPlayer(player Player, max int) error {
	if len(g.Players) >= max {
		return errors.New("game full")
	}
	g.Players = append(g.Players, player)
	fmt.Println(g)
	return nil
}

// SetBoard updates the game with provided board
func (g *Game) SetBoard(board Board) {
	g.Board = board
}

// SetFirstPlayer randomly sets the active player
func (g *Game) SetFirstPlayer(seed int64) {
	r := rand.New(rand.NewSource(seed))
	players := g.Players
	index := r.Intn(len(players))
	g.ActivePlayer = players[index]
}
