package config

import "splendid/server/pkg/splendid"

var Deck2 = []splendid.Card{
	splendid.Card{
		Points:   1,
		Cost:     map[splendid.Resource]int{Gold: 1, Silver: 2},
		Income:   Bronze,
		IsPublic: true,
	},
	splendid.Card{
		Points:   1,
		Cost:     map[splendid.Resource]int{Gold: 1, Silver: 2},
		Income:   Bronze,
		IsPublic: true,
	},
	splendid.Card{
		Points:   1,
		Cost:     map[splendid.Resource]int{Gold: 1, Silver: 2},
		Income:   Bronze,
		IsPublic: true,
	},
}
