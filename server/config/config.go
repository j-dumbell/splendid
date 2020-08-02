package config

// Port is the port exposed for the web server
var Port int = 8080

// CardsCSVPath is the relative location for the CSV to populate Cards
var CardsCSVPath string = "config/cards.csv"

// ElitesCSVPath is the relative location for the CSV to populate Elites
var ElitesCSVPath string = "config/elites.csv"

// ResourceDefault is the default amount for each Resource
var ResourceDefault int = 6
