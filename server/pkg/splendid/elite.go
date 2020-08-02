package splendid

import "github.com/j-dumbell/splendid/server/pkg/util"

// Elite represents a special Noble card
type Elite struct {
	ID     int
	Points int
	Cost   map[Resource]int
}

// CreateElites creates a list of Elite structs from CSV data
func CreateElites(rows [][]string) []Elite {
	var elites []Elite
	for i, v := range rows {
		elite := Elite{
			ID:     i + 1,
			Points: util.StringToInt(v[0]),
			Cost: map[Resource]int{
				Black: util.StringToInt(v[1]),
				White: util.StringToInt(v[2]),
				Red:   util.StringToInt(v[3]),
				Blue:  util.StringToInt(v[4]),
				Green: util.StringToInt(v[5]),
			},
		}
		elites = append(elites, elite)
	}
	return elites
}
