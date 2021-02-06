package splendid

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	m "github.com/j-dumbell/splendid/server/api/messages"
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
func (game *Game) StartGame(decks map[int][]card, elites []elite) error {
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
func (game *Game) buyCard(cardID int) error {
	activePlayer := &game.Players[game.ActivePlayerIndex]
	card, cardErr := getCard(game.Board.Decks, cardID)
	tier := card.Tier
	if cardErr != nil {
		return cardErr
	}

	newPBank, newGBank, resErr := moveResources(activePlayer.Bank, game.Board.Bank, card.Cost)
	if resErr != nil {
		return resErr
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
	if newIndex == 0 {
		game.Turn++
	}
}

func (game *Game) reserveHidden(playerID, tier int) error {
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

type payload struct {
	GameAction string `json:"gameAction"`
}

type buyCardParams struct {
	CardID int `json:"cardId"`
}

type reserveHiddenParams struct {
	Tier int `json:"tier"`
}

// HandleAction maps action params into game actions
func (game *Game) HandleAction(id int, params json.RawMessage) map[int]m.DetailsGame {
	var payload payload
	err := json.Unmarshal(params, &payload)
	if err != nil {
		return mkErrorDetails(id, "unrecognized message")
	}
	if id != game.Players[game.ActivePlayerIndex].ID {
		return mkErrorDetails(id, "not active player")
	}
	switch payload.GameAction {
	case "startGame":
		fmt.Println("starting game")
		if err := game.StartGame(decks, elites); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		return mkMaskedDetails(*game)
	case "buyCard":
		fmt.Println("buying card")
		var p buyCardParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		buyErr := game.buyCard(p.CardID)
		if buyErr != nil {
			return mkErrorDetails(id, buyErr.Error())
		}
		return mkMaskedDetails(*game)
	case "reserveHidden":
		fmt.Println("reserving card")
		var p reserveHiddenParams
		if err := json.Unmarshal(params, &p); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		fmt.Printf("tier is %v", p.Tier)
		if err := game.reserveHidden(id, p.Tier); err != nil {
			return mkErrorDetails(id, err.Error())
		}
		return mkMaskedDetails(*game)
	default:
		return mkErrorDetails(id, "unrecognized action")
	}
}
