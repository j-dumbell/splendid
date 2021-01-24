package splendid

// Player represents a player in a game
type Player struct {
	id           int
	ActiveHand   []Card
	ReservedHand []Card
	Bank         map[Resource]int
}

func NewPlayer(id int) Player {
	return Player{
		id:           id,
		ActiveHand:   []Card{},
		ReservedHand: []Card{},
		Bank:         map[Resource]int{Black: 0, White: 0, Red: 0, Blue: 0, Green: 0, Yellow: 0},
	}
}
