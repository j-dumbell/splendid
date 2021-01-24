package splendid

// Player represents a player in a game
type Player struct {
	ID              int
	Purchased       []Card
	ReservedVisible []Card
	ReservedHidden  []Card
	Bank            map[Resource]int
}

var emptyBank = map[Resource]int{Black: 0, White: 0, Red: 0, Blue: 0, Green: 0, Yellow: 0}

// NewPlayer creates a new Player
func NewPlayer(id int) Player {
	return Player{
		ID:              id,
		Purchased:       []Card{},
		ReservedVisible: []Card{},
		ReservedHidden:  []Card{},
		Bank:            emptyBank,
	}
}
