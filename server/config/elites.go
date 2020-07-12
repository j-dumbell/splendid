package config

import "splendid/server/pkg/splendid"

var Elites = []splendid.Elite{
	splendid.Elite{
		Points: 3,
		Cost:   map[splendid.Resource]int{Gold: 1, Silver: 2},
	},
	splendid.Elite{
		Points: 3,
		Cost:   map[splendid.Resource]int{Gold: 1, Silver: 2},
	},
	splendid.Elite{
		Points: 3,
		Cost:   map[splendid.Resource]int{Gold: 1, Silver: 2},
	},
}
