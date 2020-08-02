package splendid

// Resource represents currency within a game
type Resource struct {
	Name string
}

// Black is a type of Resource
var Black = Resource{Name: "Black"}

// White is a type of Resource
var White = Resource{Name: "White"}

// Red is a type of Resource
var Red = Resource{Name: "Red"}

// Blue is a type of Resource
var Blue = Resource{Name: "Blue"}

// Green is a type of Resource
var Green = Resource{Name: "Green"}

// Yellow is a type of Resource
var Yellow = Resource{Name: "Yellow"}

// MapResource maps a string to a Resource
func MapResource(s string) *Resource {
	switch s {
	case "Black":
		return &Black
	case "White":
		return &White
	case "Red":
		return &Red
	case "Blue":
		return &Blue
	case "Green":
		return &Green
	default:
		panic("Unknown resource")
	}
}
