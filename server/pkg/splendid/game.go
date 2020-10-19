package splendid

import (
	"errors"
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
func (g *Game) AddPlayer(player Player, max int) error {
	if len(g.Players) >= max {
		return errors.New("game full")
	}
	g.Players = append(g.Players, player)
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
func (g *Game) BuyCard(playerName string, cardID int, capacity int) error {
	//To do - refactor once lobbies implemented
	activePlayer := &g.Players[g.ActivePlayerIndex]
	if playerName != activePlayer.Name {
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

	newDeck, newHand, _ := MoveCard(card, g.Board.Decks[tier], activePlayer.ActiveHand)
	g.Board.Decks[tier] = newDeck
	activePlayer.ActiveHand = newHand
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
