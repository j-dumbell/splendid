package splendid

import (
	"errors"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/pkg/splendid/config"
	"github.com/j-dumbell/splendid/server/pkg/util"
)

var decks, elites = createDecks(config.CardsCSVPath, config.ElitesCSVPath)

// Game represents the state of a current game
type Game struct {
	Players           []Player `json:"players"`
	ActivePlayerIndex int      `json:"activePlayerIndex"`
	Board             board    `json:"board"`
	Turn              int      `json:"turn"`
}

// StartGame starts the game
func (game *Game) StartGame(decks map[int]Cards, elites []elite) error {
	numPlayers := len(game.Players)
	if game.Turn >= 1 {
		return errors.New("game already started")
	}
	if numPlayers <= 1 {
		return fmt.Errorf("not enough players to start. %v in game, 2 or more required", len(game.Players))
	}
	game.Turn = 1
	game.Players = util.Shuffle(game.Players, time.Now().Unix()).([]Player)
	game.Board = newBoard(decks, elites, config.GameConfigs[numPlayers])
	return nil
}

// AddPlayer adds the provided player to game, as long as there's space
func (game *Game) AddPlayer(id int) error {
	if game.Turn > 0 {
		return errors.New("game already started")
	}
	if len(game.Players) >= config.MaxPlayersDefault {
		return errors.New("game full")
	}
	for _, player := range game.Players {
		if player.ID == id {
			return fmt.Errorf("player id %v already in game", id)
		}
	}
	player := NewPlayer(id)
	game.Players = append(game.Players, player)
	return nil
}

// RemovePlayer removes the player ID from the game.
func (game *Game) RemovePlayer(id int) error {
	var newPlayers []Player
	for _, player := range game.Players {
		if player.ID != id {
			newPlayers = append(newPlayers, player)
		}
	}
	if len(newPlayers) == len(game.Players) {
		return fmt.Errorf("player \"%v\" doesn't exist", id)
	}
	game.Players = newPlayers
	return nil
}

// BuyCard checks to see whether the player can legally buy <cardID>, then performs the transaction
func (game *Game) buyCard(cardID int, resources map[resource]int) error {
	activePlayer := &game.Players[game.ActivePlayerIndex]

	flatDecks := flattenVisibleCards(game.Board.Decks)
	allCards := append(flatDecks, activePlayer.ReservedVisible, activePlayer.ReservedHidden)
	card, cardErr := getCard(allCards, cardID)
	tier := card.Tier
	if cardErr != nil {
		return cardErr
	}

	cardResources := countPurchased(activePlayer.Purchased)
	payable, err := amountPayable(resources, cardResources, card.Cost)
	if err != nil {
		return err
	}
	newPBank, newGBank, err := moveResources(activePlayer.Bank, game.Board.Bank, payable)
	if err != nil {
		return err
	}
	activePlayer.Bank = newPBank
	game.Board.Bank = newGBank

	newDeck, newHand, _ := moveCard(card, game.Board.Decks[tier], activePlayer.Purchased)
	game.Board.Decks[tier] = newDeck
	activePlayer.Purchased = newHand
	game.nextPlayer()
	return nil
}

// NextPlayer sets the next activeplayer and updates turn if necessary
func (game *Game) nextPlayer() {
	newIndex := (game.ActivePlayerIndex + 1) % len(game.Players)
	game.ActivePlayerIndex = newIndex
	if newIndex != 0 {
		return
	}

	game.Turn++
}

func (game *Game) reserveHidden(tier int) error {
	if _, exists := game.Board.Decks[tier]; !exists {
		return errors.New("tier does not exist")
	}
	if len(game.Board.Decks[tier]) <= config.DeckCapacity {
		return errors.New("deck is empty")
	}
	if game.Board.Bank[Yellow] <= 0 {
		return errors.New("no tokens in bank to reserve with")
	}
	if len(game.Players[game.ActivePlayerIndex].ReservedHidden)+len(game.Players[game.ActivePlayerIndex].ReservedVisible) >= 3 {
		return errors.New("maximum cards already reserved")
	}
	newGameBank, newPlayerBank, _ := moveResources(game.Board.Bank, game.Players[game.ActivePlayerIndex].Bank, map[resource]int{Yellow: 1})
	game.Players[game.ActivePlayerIndex].Bank = newPlayerBank
	game.Board.Bank = newGameBank
	newTier, newReserved, _ := moveCard(
		game.Board.Decks[tier][4],
		game.Board.Decks[tier],
		game.Players[game.ActivePlayerIndex].ReservedHidden,
	)
	game.Players[game.ActivePlayerIndex].ReservedHidden = newReserved
	game.Board.Decks[tier] = newTier
	game.nextPlayer()
	return nil
}

func (game *Game) takeResources(toTake map[resource]int) error {
	if err := validateTake(toTake); err != nil {
		return err
	}
	gameBank, playerBank, err := moveResources(game.Board.Bank, game.Players[game.ActivePlayerIndex].Bank, toTake)
	if err != nil {
		return err
	}
	game.Players[game.ActivePlayerIndex].Bank = playerBank
	game.Board.Bank = gameBank
	game.nextPlayer()
	return nil
}

func (game *Game) reserveVisible(cardID int) error {
	allCards := flattenVisibleCards(game.Board.Decks)
	c, err := getCard(allCards, cardID)
	if err != nil {
		return err
	}
	if game.Board.Bank[Yellow] <= 0 {
		return errors.New("no tokens in bank to reserve with")
	}
	if len(game.Players[game.ActivePlayerIndex].ReservedHidden)+len(game.Players[game.ActivePlayerIndex].ReservedVisible) >= 3 {
		return errors.New("maximum cards already reserved")
	}
	deck, hand, _ := moveCard(c, game.Board.Decks[c.Tier], game.Players[game.ActivePlayerIndex].ReservedVisible)
	gameBank, playerBank, _ := moveResources(game.Board.Bank, game.Players[game.ActivePlayerIndex].Bank, map[resource]int{Yellow: 1})
	game.Board.Decks[c.Tier] = deck
	game.Players[game.ActivePlayerIndex].ReservedVisible = hand
	game.Board.Bank = gameBank
	game.Players[game.ActivePlayerIndex].Bank = playerBank
	game.nextPlayer()
	return nil
}
