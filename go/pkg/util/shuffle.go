package util

import (
	"math/rand"
	"reflect"
)

// Shuffle will randomise items in a list
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
