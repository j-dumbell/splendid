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
func (game *Game) buyCard(playerID int, cardID int) error {
	activePlayer := &game.Players[game.ActivePlayerIndex]
	if playerID != activePlayer.ID {
		return errors.New("not active player")
	}
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

type payload struct {
	GameAction string          `json:"gameAction"`
	GameParams json.RawMessage `json:"gameParams"`
}

type buyCardParams struct {
	CardID int `json:"cardId"`
}

// HandleAction maps action params into game actions
func (game *Game) HandleAction(id int, params json.RawMessage) map[int]m.DetailsGame {
	var payload payload
	err := json.Unmarshal(params, &payload)
	if err != nil {
		details, _ := json.Marshal(m.MessageParams{Message: "unrecognized message"})
		return map[int]m.DetailsGame{id: {Ok: false, Details: details}}
	}

	switch payload.GameAction {
	case "startGame":
		fmt.Println("starting game")
		err := game.StartGame(decks, elites)
		if err != nil {
			details, _ := json.Marshal(m.MessageParams{Message: err.Error()})
			return map[int]m.DetailsGame{id: {Ok: false, Details: details}}
		}
		return maskGame(*game)
	case "buyCard":
		fmt.Println("buying card")
		var p buyCardParams
		if err := json.Unmarshal(params, &p); err != nil {
			details, _ := json.Marshal(m.MessageParams{Message: err.Error()})
			return map[int]m.DetailsGame{id: {Ok: false, Details: details}}
		}
		buyErr := game.buyCard(id, p.CardID)
		if buyErr != nil {
			details, _ := json.Marshal(m.MessageParams{Message: buyErr.Error()})
			return map[int]m.DetailsGame{id: {Ok: false, Details: details}}
		}
		return maskGame(*game)
	default:
		details, _ := json.Marshal(m.MessageParams{Message: "unrecognized action"})
		return map[int]m.DetailsGame{id: {Ok: false, Details: details}}
	}
}
