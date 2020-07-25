package splendid

import (
	"fmt"
	"io"
	"log"
	"math/rand"
	"reflect"
	"os"
	"encoding/csv"
)

type Board struct {
	Deck1  []Card
	Deck2  []Card
	Deck3  []Card
	Elites []Elite
	Bank   map[Resource]int
}

func Shuffle(arr interface{}, seed int64) interface{} {
	arrType := reflect.TypeOf(arr)
	arrValue := reflect.ValueOf(arr)
	arrLength := arrValue.Len()
	arrRand := reflect.MakeSlice(arrType, 0, 0)
	r := rand.New(rand.NewSource(seed))
	perms := r.Perm(arrLength)
	for _, v := range perms {
		arrRand = reflect.Append(arrRand, arrValue.Index(v))
	}
	return arrRand.Interface()
}

func ReadCards(path string) ([]Card, error) {
	fmt.Println("starting")
	csvfile, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	r := csv.NewReader(csvfile)
	cards := []Card
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			return nil, err
		}
		card := Card{
			Id: len(cards)+1,
			Tier: record[0],
			Points: record[2],
			Cost: map[Resource]int{},
			Income: record[1]
			IsPublic: false,
		}
		cards = append(cards, card)
	}
	return cards, err
}