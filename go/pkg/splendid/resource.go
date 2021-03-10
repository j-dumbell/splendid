package splendid

// Resource represents currency within a game
type resource string

var Black resource = "black"
var White resource = "white"
var Red resource = "red"
var Blue resource = "blue"
var Green resource = "green"
var Yellow resource = "yellow"

// MapResource maps a string to a Resource
func mapResource(s string) resource {
	switch s {
	case "black":
		return Black
	case "white":
		return White
	case "red":
		return Red
	case "blue":
		return Blue
	case "green":
		return Green
	default:
		panic("Unknown resource")
	}
}
