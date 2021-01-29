package splendid

import (
	"errors"
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

// MoveResources moves <cost>  from <fromBank> to <toBank>, returning error if <fromBank> can't afford.
func MoveResources(fromBank, toBank, cost map[Resource]int) (map[Resource]int, map[Resource]int, error) {
	for res, amount := range cost {
		fromBank[res] -= amount
		if fromBank[res] < 0 {
			return nil, nil, errors.New(fmt.Sprintf("can't afford %v: %v\n", res, amount))
		}
		toBank[res] += amount
	}
	return fromBank, toBank, nil
}
