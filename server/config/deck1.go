package config

import "github.com/j-dumbell/splendid/server/pkg/splendid"

var Deck1 = []splendid.Card{
	splendid.Card{
		Points:   1,
		Cost:     map[splendid.Resource]int{Gold: 1, Silver: 2},
		Income:   Bronze,
		IsPublic: true,
	},
	splendid.Card{
		Points:   2,
		Cost:     map[splendid.Resource]int{Gold: 1, Silver: 2},
		Income:   Bronze,
		IsPublic: true,
	},
	splendid.Card{
		Points:   3,
		Cost:     map[splendid.Resource]int{Gold: 1, Silver: 2},
		Income:   Bronze,
		IsPublic: true,
	},
}
