package splendid

// Player represents a player in a game
type Player struct {
	ID              int              `json:"id"`
	Purchased       []Card           `json:"purchased"`
	ReservedVisible []Card           `json:"reservedVisible"`
	ReservedHidden  []Card           `json:"reservedHidden"`
	Bank            map[resource]int `json:"bank"`
}

// NewPlayer creates a new Player
func NewPlayer(id int) Player {
	return Player{
		ID:              id,
		Purchased:       []Card{},
		ReservedVisible: []Card{},
		ReservedHidden:  []Card{},
		Bank:            createEmptyBank(),
	}
}
