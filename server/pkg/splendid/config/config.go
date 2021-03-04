package config

var CardsCSVPath string = "cards.csv"
var ElitesCSVPath string = "elites.csv"

var YellowDefault int = 5

var MaxPlayersDefault int = 4

var DeckCapacity int = 4

var ReservedCapacity int = 3

type GameConfig struct {
	ElitesCount   int
	ResourceCount int
}

var GameConfigs = map[int]GameConfig{
	2: {ElitesCount: 3, ResourceCount: 4},
	3: {ElitesCount: 4, ResourceCount: 5},
	4: {ElitesCount: 5, ResourceCount: 7},
}
