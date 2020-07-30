package splendid

type Resource struct {
	Name string
}

var Black = Resource{Name: "Black"}
var White = Resource{Name: "White"}
var Red = Resource{Name: "Red"}
var Blue = Resource{Name: "Blue"}
var Green = Resource{Name: "Green"}
var Yellow = Resource{Name: "Yellow"}

func MapResource(s string) Resource {
	switch s {
	case "Black":
		return Black
	case "White":
		return White
	case "Red":
		return Red
	case "Blue":
		return Blue
	case "Green":
		return Green
	default:
		panic("Unknown resource")
	}
}
