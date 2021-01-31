package splendid

// Player represents a player in a game
type Player struct {
	ID              int              `json:"id"`
	Purchased       []Card           `json:"purchased"`
	ReservedVisible []Card           `json:"reservedVisible"`
	ReservedHidden  []Card           `json:"reservedHidden"`
	Bank            map[Resource]int `json:"bank"`
}

func emptyBank() map[Resource]int {
	return map[Resource]int{Black: 10, White: 10, Red: 10, Blue: 10, Green: 10, Yellow: 10}
}

// NewPlayer creates a new Player
func NewPlayer(id int) Player {
	return Player{
		ID:              id,
		Purchased:       []Card{},
		ReservedVisible: []Card{},
		ReservedHidden:  []Card{},
		Bank:            emptyBank(),
	}
}
