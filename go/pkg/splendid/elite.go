package splendid

import "github.com/j-dumbell/splendid/go/pkg/util"

type elite struct {
	ID     int              `json:"id"`
	Points int              `json:"points"`
	Cost   map[resource]int `json:"cost"`
}

func createElites(rows [][]string) (elites []elite) {
	for i, v := range rows {
		elite := elite{
			ID:     i + 1,
			Points: util.StringToInt(v[0]),
			Cost: map[resource]int{
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
