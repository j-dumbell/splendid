package splendid

import (
	"encoding/json"

	m "github.com/j-dumbell/splendid/server/api/messages"
	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
)

func maskCards(cards []card) []card {
	maskedCards := cards
	for i, c := range maskedCards {
		maskedCards[i] = card{Tier: c.Tier}
	}
	return maskedCards
}

func maskDecks(decks map[int][]card) map[int][]card {
	maskedDecks := decks
	for tier, cards := range decks {
		if len(cards) > config.DeckCapacity {
			maskedDecks[tier] = append(
				cards[:config.DeckCapacity],
				maskCards(cards[config.DeckCapacity:])...,
			)
		}
	}
	return maskedDecks
}

func maskPlayerHands(id int, players []Player) []Player {
	for i, player := range players {
		if player.ID != id {
			players[i].ReservedHidden = maskCards(players[i].ReservedHidden)
		}
	}
	return players
}

type gameDetails struct {
	Game Game `json:"game"`
}

func maskGame(game Game) map[int]m.DetailsGame {
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
