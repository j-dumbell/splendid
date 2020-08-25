package splendid

import (
	"errors"
	"math/rand"
)

// Game represents the state of a current game
type Game struct {
	Players      []Player
	ActivePlayer *Player
	Board        Board
}

// AddPlayer adds the provided player to game, as long as there's space
func (g *Game) AddPlayer(player Player, max int) error {
	if len(g.Players) >= max {
		return errors.New("game full")
	}
	g.Players = append(g.Players, player)
	return nil
}

// SetBoard updates the game with provided board
func (g *Game) SetBoard(board Board) {
	g.Board = board
}

// SetFirstPlayer randomly sets the active player
func (g *Game) SetFirstPlayer(seed int64) {
	r := rand.New(rand.NewSource(seed))
	players := g.Players
	index := r.Intn(len(players))
	g.ActivePlayer = &players[index]
}

//LastCards returns the last <index> cards
func LastCards(cards []Card, index int) ([]Card, error) {
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
	if playerName != (*g.ActivePlayer).Name {
		return errors.New("not active player")
	}
	card, err := GetCard(g.Board.Decks, cardID, capacity)
	tier := card.Tier
	if err != nil {
		return err
	}
	newPBank := g.ActivePlayer.Bank
	newGBank := g.Board.Bank
	for res, cost := range card.Cost {
		newAmount := g.ActivePlayer.Bank[res] - cost
		if newAmount < 0 {
			return errors.New("can't afford")
		}
		newPBank[res] = newAmount
		newGBank[res] = g.Board.Bank[res] + cost
	}
	g.ActivePlayer.Bank = newPBank
	g.Board.Bank = newGBank

	newDeck, newHand, _ := MoveCard(card, g.Board.Decks[tier], g.ActivePlayer.ActiveHand)
	g.Board.Decks[tier] = newDeck
	g.ActivePlayer.ActiveHand = newHand
	return nil
}
