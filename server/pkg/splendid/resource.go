package splendid

import (
	"fmt"
)

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

// MoveResources moves <cost>  from <fromBank> to <toBank>, returning error if <fromBank> can"t afford.
func moveResources(fromBank, toBank, cost map[resource]int) (map[resource]int, map[resource]int, error) {
	newFromBank := copyBank(fromBank)
	newToBank := copyBank(toBank)
	for res, amount := range cost {
		newFromBank[res] -= amount
		if newFromBank[res] < 0 {
			return nil, nil, fmt.Errorf("can't afford %v: %v", res, amount)
		}
		newToBank[res] += amount
	}
	return newFromBank, newToBank, nil
}
