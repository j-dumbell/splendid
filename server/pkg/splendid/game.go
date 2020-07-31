package splendid

// Game represents the state of a current game
type Game struct {
	Players      []Player
	ActivePlayer Player
	Board        Board
}
