package game

type Card struct {
	Points   int
	Cost     map[Resource]int
	Income   map[Resource]int
	IsPublic bool
}
