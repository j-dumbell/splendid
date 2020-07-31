package splendid

import (
	"encoding/csv"
	"math/rand"
	"os"
	"reflect"
	"strconv"
)

// ReadCSV parses and returns a CSV file from a given path
func ReadCSV(path string) ([][]string, error) {
	csvfile, err := os.Open(path)
	if err != nil {
		return nil, err
	}
	r := csv.NewReader(csvfile)
	records, err := r.ReadAll()
	if err != nil {
		return nil, err
	}
	return records, err
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

func StringToInt(s string) int {
	integer, _ := strconv.Atoi(s)
	return integer
}
