package splendid

import (
	"encoding/json"

	"github.com/j-dumbell/splendid/server/api/messages"
)

func maskCards(cards []Card) []Card {
	maskedCards := cards
	for i, card := range maskedCards {
		maskedCards[i] = Card{Tier: card.Tier}
	}
	return maskedCards
}

func maskDecks(decks map[int][]Card) map[int][]Card {
	maskedDecks := decks
	for tier, cards := range decks {
		if len(cards) > 4 {
			maskedDecks[tier] = append(cards[:4], maskCards(cards[4:])...)
		}
	}
	return maskedDecks
}

func maskPlayers(id int, players []Player) []Player {
	maskedPlayers := players
	for i, player := range players {
		if player.ID != id {
			maskedPlayers[i].ReservedHidden = maskCards(players[i].ReservedHidden)
		}
	}
	return maskedPlayers
}

func maskGame(g Game) map[int]messages.GameResponse {
	maskedDecks := maskDecks(g.Board.Decks)

	var idToResponse map[int]messages.GameResponse
	for _, player := range g.Players {
		maskedGame := g
		maskedGame.Board.Decks = maskedDecks
		maskedGame.Players = maskPlayers(player.ID, g.Players)

		jsonGame, _ := json.Marshal(maskedGame)
		idToResponse[player.ID] = messages.GameResponse{
			Ok:      true,
			Details: jsonGame,
		}
	}
	return idToResponse
}
