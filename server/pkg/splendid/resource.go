package splendid

import (
	"fmt"
)

// Resource represents currency within a game
type Resource string

var Black Resource = "black"
var White Resource = "white"
var Red Resource = "red"
var Blue Resource = "blue"
var Green Resource = "green"
var Yellow Resource = "yellow"

// MapResource maps a string to a Resource
func MapResource(s string) Resource {
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

// MoveResources moves <cost>  from <fromBank> to <toBank>, returning error if <fromBank> can"t afford.
func MoveResources(fromBank, toBank, cost map[Resource]int) (map[Resource]int, map[Resource]int, error) {
	newFromBank := copyBank(fromBank)
	newToBank := copyBank(toBank)
	for res, amount := range cost {
		newFromBank[res] -= amount
		if newFromBank[res] < 0 {
			return nil, nil, fmt.Errorf("can't afford %v: %v", res, amount)
		}
		newToBank[res] += amount
	}
	return newFromBank, toBank, nil
}
