package api

type Lobby struct{
	Clients map[*Client]bool
}

func NewLobby() Lobby {
	return Lobby{Clients: make(map[*Client]bool)}
}
