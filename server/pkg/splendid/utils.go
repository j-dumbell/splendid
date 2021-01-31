package splendid

func copyBank(bank map[Resource]int) map[Resource]int {
	newBank := make(map[Resource]int)
	for res, amount := range bank {
		newBank[res] = amount
	}
	return newBank
}

func createEmptyBank() map[Resource]int {
	return map[Resource]int{Black: 0, White: 0, Red: 0, Blue: 0, Green: 0, Yellow: 0}
}
