import { SplendidGame } from "../../components/Splendid/domain";
import {
  addChatMessage,
  exitLobby,
  joinLobby,
  updateSplendidGame,
} from "../actionCreator";
import { State } from "../domain";
import reducer from ".";
import { defaultState } from "..";

const game: SplendidGame = {
  turn: 1,
  activePlayerIndex: 0,
  players: [],
  board: {
    elites: [],
    decks: {
      1: [],
      2: [],
      3: [],
    },
    bank: {
      black: 0,
      white: 0,
      red: 0,
      blue: 0,
      green: 0,
      yellow: 0,
    },
  },
};

describe("reducer()", () => {
  describe("action JOIN_LOBBY", () => {
    it("it returns updated state on initial action", () => {
      const action = joinLobby("123abc", 1, { 1: "Van" });
      const newState = reducer(defaultState, action);

      expect(newState.clientId).toBe(action.payload.clientId);
      expect(newState.lobbyId).toBe(action.payload.lobbyId);
      expect(newState.playerNames).toEqual(action.payload.playerNames);
    });

    it("it returns updated state when additional players join", () => {
      const initialState: State = {
        ...defaultState,
        clientId: 1,
        lobbyId: "123abc",
        playerNames: { 1: "Van" },
      };
      const action = joinLobby("123abc", 2, {
        1: "Van",
        2: "James",
      });
      const newState = reducer(initialState, action);

      expect(newState.playerNames).toEqual(action.payload.playerNames);
    });

    it("it returns updated state if lobbyId is different", () => {
      const initialState: State = {
        ...defaultState,
        clientId: 1,
        lobbyId: "123abc",
        playerNames: { 1: "Van" },
      };
      const action = joinLobby("456def", 1, { 1: "Van" });
      const newState = reducer(initialState, action);

      expect(newState.lobbyId).toBe(action.payload.lobbyId);
    });
  });

  describe("action EXIT_LOBBY", () => {
    it("it returns updated state on leaving a lobby", () => {
      const initialState: State = {
        ...defaultState,
        clientId: 1,
        lobbyId: "123abc",
        playerNames: {
          1: "Van",
          2: "James",
        },
      };
      const action = exitLobby(1, { 2: "James" });
      const newState = reducer(initialState, action);

      expect(newState.playerNames).toEqual({});
      expect(newState.lobbyId).toBeUndefined();
    });

    it("it returns updated state when other players leave", () => {
      const initialState: State = {
        ...defaultState,
        clientId: 1,
        lobbyId: "123abc",
        playerNames: {
          1: "Van",
          2: "James",
        },
      };
      const action = exitLobby(1, { 1: "Van" });
      const newState = reducer(initialState, action);

      expect(newState.playerNames).toEqual(action.payload.playerNames);
    });
  });

  describe("action ADD_CHAT_MESSAGE", () => {
    it("it appends to chat state", () => {
      const action = addChatMessage(1, "hello");
      const newState = reducer(defaultState, action);
      const newerState = reducer(newState, action);

      expect(newerState.chat).toEqual([action.payload, action.payload]);
    });
  });

  describe("action ADD_HISTORY_ACTION", () => {});

  describe("action UPDATE_GAME", () => {
    it("it returns updated state on initial action", () => {
      const action = updateSplendidGame(game);
      const newState = reducer(defaultState, action);

      expect(newState.game.response).toEqual(action.payload);
      expect(newState.game.response?.activePlayerIndex).toBe(0);
    });

    it("it replaces updated game", () => {
      const action = updateSplendidGame({ ...game, activePlayerIndex: 1 });
      const newState = reducer(defaultState, action);
      const newerState = reducer(newState, action);

      expect(newerState.game.response).toEqual(action.payload);
      expect(newerState.game.response?.activePlayerIndex).toBe(1);
    });
  });
});
