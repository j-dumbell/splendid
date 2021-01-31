package splendid

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/j-dumbell/splendid/server/api/messages"
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
func (g *Game) StartGame(decks map[int][]card, elites []elite) error {
	numPlayers := len(g.Players)
	if g.Turn >= 1 {
		return errors.New("game already started")
	}
	if numPlayers <= 1 {
		return fmt.Errorf("not enough players to start. %v in game, 2 or more required", len(g.Players))
	}
	g.Turn = 1
	g.Players = util.Shuffle(g.Players, time.Now().Unix()).([]Player)
	g.Board = newBoard(decks, elites, config.GameConfigs[numPlayers])
	return nil
}

// AddPlayer adds the provided player to game, as long as there's space
func (g *Game) AddPlayer(id int) error {
	if g.Turn > 0 {
		return errors.New("game already started")
	}
	if len(g.Players) >= config.MaxPlayersDefault {
		return errors.New("game full")
	}
	for _, player := range g.Players {
		if player.ID == id {
			return fmt.Errorf("player id %v already in game", id)
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
	g.Players = newPlayers
	return nil
}

// BuyCard checks to see whether the player can legally buy <cardID>, then performs the transaction
func (g *Game) BuyCard(playerID int, cardID int) error {
	activePlayer := &g.Players[g.ActivePlayerIndex]
	if playerID != activePlayer.ID {
		return errors.New("not active player")
	}
	card, cardErr := getCard(g.Board.Decks, cardID)
	tier := card.Tier
	if cardErr != nil {
		return cardErr
	}

	newPBank, newGBank, resErr := moveResources(activePlayer.Bank, g.Board.Bank, card.Cost)
	if resErr != nil {
		return resErr
	}
	activePlayer.Bank = newPBank
	g.Board.Bank = newGBank

	newDeck, newHand, _ := moveCard(card, g.Board.Decks[tier], activePlayer.Purchased)
	g.Board.Decks[tier] = newDeck
	activePlayer.Purchased = newHand
	g.nextPlayer()
	return nil
}

// NextPlayer sets the next activeplayer and updates turn if necessary
func (g *Game) nextPlayer() {
	newIndex := (g.ActivePlayerIndex + 1) % len(g.Players)
	g.ActivePlayerIndex = newIndex
	if newIndex == 0 {
		g.Turn++
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
func (g *Game) HandleAction(id int, params json.RawMessage) map[int]messages.DetailsGame {
	var payload payload
	err := json.Unmarshal(params, &payload)
	if err != nil {
		details, _ := json.Marshal(messages.MessageParams{Message: "unrecognized message"})
		return map[int]messages.DetailsGame{id: {Ok: false, Details: details}}
	}

	switch payload.GameAction {
	case "startGame":
		fmt.Println("starting game")
		err := g.StartGame(decks, elites)
		if err != nil {
			details, _ := json.Marshal(messages.MessageParams{Message: err.Error()})
			return map[int]messages.DetailsGame{id: {Ok: false, Details: details}}
		}
		return maskGame(*g)
	case "buyCard":
		fmt.Println("buying card")
		var p buyCardParams
		if err := json.Unmarshal(params, &p); err != nil {
			details, _ := json.Marshal(messages.MessageParams{Message: err.Error()})
			return map[int]messages.DetailsGame{id: {Ok: false, Details: details}}
		}
		buyErr := g.BuyCard(id, p.CardID)
		if buyErr != nil {
			details, _ := json.Marshal(messages.MessageParams{Message: buyErr.Error()})
			return map[int]messages.DetailsGame{id: {Ok: false, Details: details}}
		}
		return maskGame(*g)
	default:
		details, _ := json.Marshal(messages.MessageParams{Message: "unrecognized action"})
		return map[int]messages.DetailsGame{id: {Ok: false, Details: details}}
	}
}
