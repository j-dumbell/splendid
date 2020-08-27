package splendid

// Player represents a player in a game
type Player struct {
	Name         string
	ActiveHand   []Card
	ReservedHand []Card
	Bank         map[Resource]int
}

func NewPlayer(name string) Player {
	return Player{
		Name:         name,
		ActiveHand:   []Card{},
		ReservedHand: []Card{},
		Bank:         map[Resource]int{Black: 0, White: 0, Red: 0, Blue: 0, Green: 0, Yellow: 0},
	}
}
