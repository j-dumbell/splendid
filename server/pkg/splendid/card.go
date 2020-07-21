package splendid

type Card struct {
	Id       int
	Points   int
	Cost     map[Resource]int
	Income   Resource
	IsPublic bool
}
