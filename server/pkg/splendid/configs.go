package splendid

var Gold = Resource{Name: "Gold"}
var Silver = Resource{Name: "Silver"}
var Bronze = Resource{Name: "Bronze"}

var Card1 = Card{
	Points: 1,
	Cost: map[Resource]int{Gold: 1, Silver: 2},
	Income: Bronze,
	IsPublic: true,
}
