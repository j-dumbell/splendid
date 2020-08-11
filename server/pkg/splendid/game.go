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
	ActivePlayer Player
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
	g.ActivePlayer = players[index]
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

//VisibleCards returns the visible cards from each deck
func (g *Game) VisibleCards(capacity int) ([]Card, []Card, []Card) {
	board := g.Board
	visDeck1, _ := LastCards(board.Deck1, capacity)
	visDeck2, _ := LastCards(board.Deck2, capacity)
	visDeck3, _ := LastCards(board.Deck3, capacity)
	return visDeck1, visDeck2, visDeck3
}

//GetCard checks whether <id> is visible and returns the corresponding card
func (g *Game) GetCard(id int, capacity int) (Card, error) {
	visDeck1, visDeck2, visDeck3 := g.VisibleCards(capacity)
	visDecks := append(visDeck1, append(visDeck2, visDeck3...)...)
	for _, v := range visDecks {
		if v.ID == id {
			return v, nil
		}
	}
	return Card{}, errors.New("invalid card selected")
}

//Checks to see whether <player> can buy the card, then performs the transaction
func (g *Game) BuyCard(player Player, cardID int, capacity int) error {
	//Should input param be playerName instead?
	if g.ActivePlayer != player {
		return errors.New("not player's turn")
	}
	card, err := g.GetCard(cardID, capacity)
	if err != nil {
		return err
	}
	for res, amount := range card.Cost {
		if newAmount := player.Bank[res] - amount; newAmount < 0 {
			return errors.New("can't afford")
		}
		//To do - mutate banks.  Use pointers?
	}
}
