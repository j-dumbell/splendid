package splendid

import (
	"encoding/json"

	m "github.com/j-dumbell/splendid/server/api/messages"
	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
)

func maskCards(cards Cards) Cards {
	f := func(card Card) Card { return Card{Tier: card.Tier} }
	return cards.apply(f)
}

func maskDecks(decks map[int]Cards) map[int]Cards {
	maskedDecks := map[int]Cards{}
	for tier, cards := range decks {
		copyCards := make(Cards, len(cards))
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
			reservedHiddenCopy := make(Cards, len(players[i].ReservedHidden))
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
