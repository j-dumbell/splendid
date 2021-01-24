package splendid

import (
	"encoding/json"
	"errors"
	"fmt"

	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
)

// Game represents the state of a current game
type Game struct {
	Players           []Player
	ActivePlayerIndex int
	Board             Board
	Turn              int
}

// NewGame instantiates a new Game
func NewGame(d map[int][]Card, e []Elite) Game {
	return Game{
		ActivePlayerIndex: 0,
		Board:             NewBoard(d, e),
	}
}

// AddPlayer adds the provided player to game, as long as there's space
func (g *Game) AddPlayer(id int) error {
	if len(g.Players) >= config.MaxPlayersDefault {
		return errors.New("game full")
	}
	for _, player := range g.Players {
		if player.ID == id {
			return fmt.Errorf("player id \"%v\" already in game", id)
		}
	}
	player := NewPlayer(id)
	g.Players = append(g.Players, player)
	return nil
}

// RemovePlayer removes the player ID from the game.
func (g *Game) RemovePlayer(id int) error {
	var newPlayers []Player
	for _, player := range g.Players {
		if player.ID != id {
			newPlayers = append(newPlayers, player)
		}
	}
	if len(newPlayers) == len(g.Players) {
		return fmt.Errorf("player \"%v\" doesn't exist", id)
	}
	return nil
}

// lastCards returns the last <index> cards
func lastCards(cards []Card, index int) ([]Card, error) {
	if index < 0 {
		return nil, errors.New("negative index provided")
	}
	lowerBound := len(cards) - index
	if lowerBound < 0 {
		return cards, nil
	}
	return cards[lowerBound:], nil
}

// BuyCard checks to see whether the player can legally buy <cardID>, then performs the transaction
func (g *Game) BuyCard(playerId int, cardID int, capacity int) error {
	//To do - refactor once lobbies implemented
	activePlayer := &g.Players[g.ActivePlayerIndex]
	if playerId != activePlayer.ID {
		return errors.New("not active player")
	}
	card, cardErr := GetCard(g.Board.Decks, cardID, capacity)
	tier := card.Tier
	if cardErr != nil {
		return cardErr
	}

	newPBank, newGBank, resErr := MoveResources(activePlayer.Bank, g.Board.Bank, card.Cost)
	if resErr != nil {
		return resErr
	}
	activePlayer.Bank = newPBank
	g.Board.Bank = newGBank

	newDeck, newHand, _ := MoveCard(card, g.Board.Decks[tier], activePlayer.Purchased)
	g.Board.Decks[tier] = newDeck
	activePlayer.Purchased = newHand
	g.NextPlayer()
	return nil
}

// NextPlayer sets the next activeplayer and updates turn if necessary
func (g *Game) NextPlayer() {
	newIndex := (g.ActivePlayerIndex + 1) % len(g.Players)
	g.ActivePlayerIndex = newIndex
	if newIndex == 0 {
		g.Turn += 1
	}
}

func (g *Game) HandleAction(id int, params json.RawMessage) map[int]json.RawMessage {
	return nil
}
