package splendid

import (
	"errors"
	"fmt"
)

// Resource represents currency within a game
type Resource string

var Black Resource = "Black"
var White Resource = "White"
var Red Resource = "Red"
var Blue Resource = "Blue"
var Green Resource = "Green"
var Yellow Resource = "Yellow"

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
func MoveResources(fromBank, toBank, cost map[Resource]int) (map[Resource]int, map[Resource]int, error) {
	for res, amount := range cost {
		fromBank[res] -= amount
		if fromBank[res] < 0 {
			return nil, nil, errors.New(fmt.Sprintf("can't afford %v: %v", res, amount))
		}
		toBank[res] += amount
	}
	return fromBank, toBank, nil
}
