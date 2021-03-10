package util

import "strconv"

// StringToInt casts numerical strings to integer types
func StringToInt(s string) int {
	integer, _ := strconv.Atoi(s)
	return integer
}
