package splendid

type Player struct {
	Name         string
	ActiveHand   []Card
	ReservedHand []Card
	Bank         map[Resource]int
}