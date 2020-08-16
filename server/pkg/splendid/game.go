package splendid

import (
	"errors"
	"fmt"
	"math/rand"
	"reflect"
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
	fmt.Println(g)
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

func (g *Game) BuyCard(playerName string, cardID int, capacity int) error {
	if playerName != (*g.ActivePlayer).Name {
		return errors.New("not active player")
	}
	card, err := GetCard(g.Board.Decks, cardID, capacity)
	tier := card.Tier
	if err != nil {
		return err
	}
	newPBank := NewBank()
	newGBank := NewBank()
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
	g.ActivePlayer.ActiveHand = append(g.ActivePlayer.ActiveHand, card)
	var newGDeck []Card
	for _, v := range g.Board.Decks[tier] {
		if !reflect.DeepEqual(v, card) {
			newGDeck = append(newGDeck, v)
		}
	}
	g.Board.Decks[tier] = newGDeck
	return nil
}
