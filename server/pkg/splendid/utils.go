package splendid

// CopyBank makes a duplicate of a bank
func CopyBank(bank map[Resource]int) map[Resource]int {
	newBank := make(map[Resource]int)
	for res, amount := range bank {
		newBank[res] = amount
	}
	return newBank
}
