package splendid

// Player represents a player in a game
type Player struct {
	ID              int              `json:"id"`
	Purchased       []Card           `json:"purchased"`
	ReservedVisible []Card           `json:"reservedVisible"`
	ReservedHidden  []Card           `json:"reservedHidden"`
	Bank            map[Resource]int `json:"bank"`
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
