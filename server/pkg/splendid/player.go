package splendid

// Player represents a player in a game
type Player struct {
	Name         string
	ActiveHand   []Card
	ReservedHand []Card
	Bank         map[Resource]int
}
