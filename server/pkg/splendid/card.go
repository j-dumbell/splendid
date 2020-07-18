package splendid

type Card struct {
	Points   int
	Cost     map[Resource]int
	Income   Resource
	IsPublic bool
}
