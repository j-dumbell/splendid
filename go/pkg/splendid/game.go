package splendid

import (
	"errors"
	"fmt"
	"reflect"
	"time"

	"github.com/j-dumbell/splendid/go/pkg/splendid/config"
	"github.com/j-dumbell/splendid/go/pkg/util"
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

func (game *Game) buyCard(cardID int, resources map[resource]int) error {
	activePlayer := &game.Players[game.ActivePlayerIndex]

	locationToCards := map[string]Cards{
		"1":       visibleCards(game.Board.Decks[1]),
		"2":       visibleCards(game.Board.Decks[2]),
		"3":       visibleCards(game.Board.Decks[3]),
		"hidden":  activePlayer.ReservedHidden,
		"visible": activePlayer.ReservedVisible,
	}

	var location string
	card := Card{}
	for loc, cards := range locationToCards {
		if c, exists := cards.find(func(card Card) bool { return card.ID == cardID }); exists == true {
			card = c
			location = loc
			break
		}
	}
	fmt.Println(card)
	if reflect.DeepEqual(card, Card{}) {
		return errors.New("invalid card ID")
	}

	cardResources := countPurchased(activePlayer.Purchased)
	payable, err := amountPayable(resources, cardResources, card.Cost)
	fmt.Println(payable)
	if err != nil {
		return err
	}
	activePlayer.Bank = subtractResources(activePlayer.Bank, payable)
	game.Board.Bank = addResources(game.Board.Bank, payable)

	activePlayer.Purchased = append(activePlayer.Purchased, card)
	f := func(c Card) bool { return !reflect.DeepEqual(c, card) }
	switch location {
	case "1", "2", "3":
		tier := util.StringToInt(location)
		deck := game.Board.Decks[tier]
		game.Board.Decks[tier] = deck.filter(f)
	case "hidden":
		activePlayer.ReservedHidden = activePlayer.ReservedHidden.filter(f)
	case "visible":
		activePlayer.ReservedVisible = activePlayer.ReservedVisible.filter(f)
	}
	return nil
}

func (game *Game) endTurn() int {
	game.moveElite()
	newIndex := (game.ActivePlayerIndex + 1) % len(game.Players)
	game.ActivePlayerIndex = newIndex
	if newIndex != 0 {
		return 0
	}
	game.Turn++
	return winnerID(game.Players)
}

func (game *Game) reserveHidden(tier int) error {
	activePlayer := &game.Players[game.ActivePlayerIndex]
	deck, exists := game.Board.Decks[tier]

	if !exists {
		return errors.New("tier does not exist")
	}
	if len(deck) <= config.DeckCapacity {
		return errors.New("deck is empty")
	}
	if game.Board.Bank[Yellow] <= 0 {
		return errors.New("no tokens in bank to reserve with")
	}
	if len(activePlayer.ReservedHidden)+len(activePlayer.ReservedVisible) >= config.ReservedCapacity {
		return errors.New("maximum cards already reserved")
	}

	activePlayer.Bank[Yellow] += 1
	game.Board.Bank[Yellow] -= 1

	card := deck[4]
	activePlayer.ReservedHidden = append(activePlayer.ReservedHidden, card)
	game.Board.Decks[tier] = deck.filter(func(c Card) bool { return !reflect.DeepEqual(c, card) })
	return nil
}

func (game *Game) takeResources(toTake map[resource]int) error {
	activePlayer := &game.Players[game.ActivePlayerIndex]
	if err := validateTake(toTake); err != nil {
		return err
	}
	if !canAfford(game.Board.Bank, toTake) {
		return errors.New("not enough resources in bank")
	}
	game.Board.Bank = subtractResources(game.Board.Bank, toTake)
	activePlayer.Bank = addResources(activePlayer.Bank, toTake)
	return nil
}

func (game *Game) reserveVisible(cardID int) error {
	activePlayer := &game.Players[game.ActivePlayerIndex]
	allCards := Cards{}
	for _, cards := range game.Board.Decks {
		allCards = append(allCards, visibleCards(cards)...)
	}
	card, exists := allCards.find(func(c Card) bool { return c.ID == cardID })
	if !exists {
		return errors.New("invalid cardID")
	}
	if game.Board.Bank[Yellow] <= 0 {
		return errors.New("no tokens in bank to reserve with")
	}
	if len(activePlayer.ReservedHidden)+len(activePlayer.ReservedVisible) >= config.ReservedCapacity {
		return errors.New("maximum cards already reserved")
	}
	deck := game.Board.Decks[card.Tier]
	activePlayer.ReservedVisible = append(activePlayer.ReservedVisible, card)
	game.Board.Decks[card.Tier] = deck.filter(func(c Card) bool { return !reflect.DeepEqual(c, card) })

	activePlayer.Bank[Yellow] += 1
	game.Board.Bank[Yellow] -= 1
	return nil
}

func (game *Game) moveElite() {
	activePlayer := &game.Players[game.ActivePlayerIndex]
	cardCounts := countPurchased(activePlayer.Purchased)
	newBoardElites := []elite{}
	for _, e := range game.Board.Elites {
		if canAfford(cardCounts, e.Cost) {
			activePlayer.Elites = append(activePlayer.Elites, e)
		} else {
			newBoardElites = append(newBoardElites, e)
		}
	}
	game.Board.Elites = newBoardElites
}
