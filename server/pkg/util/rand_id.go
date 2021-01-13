package util

import (
	"math/rand"
)

// RandID generates a random alphanumeric string of length n
func RandID(n int, seed int64) string {
	r := rand.New(rand.NewSource(seed))
	runes := []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789")
	id := make([]rune, n)
	for i := range id {
		id[i] = runes[r.Intn(len(runes))]
	}
	return string(id)
}
