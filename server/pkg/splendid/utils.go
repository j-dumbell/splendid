package splendid

import (
	"math/rand"
	"reflect"
	"strconv"
)

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
