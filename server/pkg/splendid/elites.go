package splendid

type Elite struct {
	ID	   int
	Points int
	Cost   map[Resource]int
}

func CreateElites(rows [][]string) []Elite {
	var elites []Elite
	for i, v := range rows {
		elite := Elite{
			ID: i+1,
			Points: StringToInt(v[0]),
			Cost: map[Resource]int{
				Black: StringToInt(v[1]),
				White: StringToInt(v[2]),
				Red: StringToInt(v[3]),
				Blue: StringToInt(v[4]),
				Green: StringToInt(v[5]),
			},
		}
		elites = append(elites, elite)
	}
	return elites
}
