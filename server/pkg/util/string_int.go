package util

import "strconv"

func StringToInt(s string) int {
	integer, _ := strconv.Atoi(s)
	return integer
}
