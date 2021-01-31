package splendid

import (
	"encoding/json"

	"github.com/j-dumbell/splendid/server/api/messages"
	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
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

type GameDetails struct {
	Game Game `json:"game"`
}

func maskGame(g Game) map[int]messages.DetailsGame {
	maskedDecks := maskDecks(g.Board.Decks)

	idToResponse := map[int]messages.DetailsGame{}
	for _, player := range g.Players {
		maskedGame := g
		maskedGame.Board.Decks = maskedDecks
		maskedGame.Players = maskPlayerHands(player.ID, g.Players)

		jsonGame, _ := json.Marshal(GameDetails{Game: maskedGame})

		idToResponse[player.ID] = messages.DetailsGame{
			Ok:      true,
			Details: jsonGame,
		}
	}
	return idToResponse
}
