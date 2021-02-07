package splendid

// Player represents a player in a game
type Player struct {
	ID              int              `json:"id"`
	Purchased       Cards            `json:"purchased"`
	ReservedVisible Cards            `json:"reservedVisible"`
	ReservedHidden  Cards            `json:"reservedHidden"`
	Bank            map[resource]int `json:"bank"`
}

// NewPlayer creates a new Player
func NewPlayer(id int) Player {
	return Player{
		ID:              id,
		Purchased:       Cards{},
		ReservedVisible: Cards{},
		ReservedHidden:  Cards{},
		Bank:            createEmptyBank(),
	}
}
