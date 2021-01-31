package splendid

// Player represents a player in a game
type Player struct {
	ID              int              `json:"id"`
	Purchased       []card           `json:"purchased"`
	ReservedVisible []card           `json:"reservedVisible"`
	ReservedHidden  []card           `json:"reservedHidden"`
	Bank            map[resource]int `json:"bank"`
}

// NewPlayer creates a new Player
func NewPlayer(id int) Player {
	return Player{
		ID:              id,
		Purchased:       []card{},
		ReservedVisible: []card{},
		ReservedHidden:  []card{},
		Bank:            createEmptyBank(),
	}
}
