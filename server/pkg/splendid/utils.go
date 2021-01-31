package splendid

func copyBank(bank map[resource]int) map[resource]int {
	newBank := make(map[resource]int)
	for res, amount := range bank {
		newBank[res] = amount
	}
	return newBank
}

func createEmptyBank() map[resource]int {
	return map[resource]int{Black: 0, White: 0, Red: 0, Blue: 0, Green: 0, Yellow: 0}
}
