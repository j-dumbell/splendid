package splendid

import (
	"encoding/csv"
	"io"
	"os"
)

type Board struct {
	Deck1  []Card
	Deck2  []Card
	Deck3  []Card
	Elites []Elite
	Bank   map[Resource]int
}

func ReadCards(path string) ([]Card, error) {
	csvfile, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	r := csv.NewReader(csvfile)
	var cards []Card
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		card := Card{
			ID:     len(cards) + 1,
			Tier:   StringToInt(record[0]),
			Points: StringToInt(record[2]),
			Cost: map[Resource]int{
				Black: StringToInt(record[3]),
				White: StringToInt(record[4]),
				Red:   StringToInt(record[5]),
				Blue:  StringToInt(record[6]),
				Green: StringToInt(record[7]),
			},
			Income:   MapResource(record[1]),
			IsPublic: false,
		}
		cards = append(cards, card)
	}
	return cards, err
}
