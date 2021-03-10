package util

import (
	"encoding/csv"
	"os"
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
