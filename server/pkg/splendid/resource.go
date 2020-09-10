package splendid

import (
	"errors"
	"fmt"
)

// Resource represents currency within a game
type Resource struct {
	Name string
}

var Black = Resource{Name: "Black"}
var White = Resource{Name: "White"}
var Red = Resource{Name: "Red"}
var Blue = Resource{Name: "Blue"}
var Green = Resource{Name: "Green"}
var Yellow = Resource{Name: "Yellow"}

// MapResource maps a string to a Resource
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

// MoveResources moves <cost>  from <fromBank> to <toBank>, returning error if <fromBank> can't afford.
func MoveResources(fromBank map[Resource]int, toBank map[Resource]int, cost map[Resource]int) (map[Resource]int, map[Resource]int, error) {
	for res, amount := range cost {
		fromBank[res] -= amount
		if fromBank[res] < 0 {
			return nil, nil, errors.New(fmt.Sprintf("can't afford %v: %v", res, amount))
		}
		toBank[res] += amount
	}
	return fromBank, toBank, nil
}
