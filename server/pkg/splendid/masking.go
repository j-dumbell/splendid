package splendid

import (
	"encoding/json"

	m "github.com/j-dumbell/splendid/server/api/messages"
	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
)

func maskCards(cards []Card) []Card {
	maskedCards := make([]Card, len(cards))
	copy(maskedCards, cards)
	for i, c := range cards {
		maskedCards[i] = Card{Tier: c.Tier}
	}
	return maskedCards
}

func maskDecks(decks map[int][]Card) map[int][]Card {
	maskedDecks := map[int][]Card{}
	for tier, cards := range decks {
		copyCards := make([]Card, len(cards))
		copy(copyCards, cards)
		if len(cards) > config.DeckCapacity {
			maskedDecks[tier] = append(
				copyCards[:config.DeckCapacity],
				maskCards(copyCards[config.DeckCapacity:])...,
			)
		} else {
			maskedDecks[tier] = copyCards
		}
	}
	return maskedDecks
}

func maskPlayerHands(id int, players []Player) []Player {
	maskedPlayers := make([]Player, len(players))
	copy(maskedPlayers, players)
	for i, player := range players {
		if player.ID != id {
			reservedHiddenCopy := make([]Card, len(players[i].ReservedHidden))
			copy(reservedHiddenCopy, players[i].ReservedHidden)
			maskedPlayers[i].ReservedHidden = maskCards(reservedHiddenCopy)
		}
	}
	return maskedPlayers
}

type gameDetails struct {
	Game Game `json:"game"`
}

func mkMaskedDetails(game Game) map[int]m.DetailsGame {
	maskedDecks := maskDecks(game.Board.Decks)

	idToResponse := map[int]m.DetailsGame{}
	for _, player := range game.Players {
		maskedGame := game
		maskedGame.Board.Decks = maskedDecks
		maskedGame.Players = maskPlayerHands(player.ID, game.Players)

		jsonGame, _ := json.Marshal(gameDetails{Game: maskedGame})

		idToResponse[player.ID] = m.DetailsGame{
			Ok:      true,
			Details: jsonGame,
		}
	}
	return idToResponse
}
