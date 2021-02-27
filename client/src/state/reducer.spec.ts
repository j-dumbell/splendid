import { SplendidGame } from "../components/Splendid/domain";
import {
  ExitLobbyAction,
  JoinLobbyAction,
  MessageAction,
  SplendidAction,
  SplendidResourceAction,
  State,
} from "./domain";
import reducer, { defaultState } from "./reducer";

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
      const action: JoinLobbyAction = {
        type: "JOIN_LOBBY",
        payload: {
          lobbyId: "123abc",
          clientId: 1,
          playerNames: {
            1: "Van",
          },
        },
      };
      const newState = reducer(defaultState, action);
      const expectedState: State = {
        ...defaultState,
        clientId: action.payload.clientId,
        lobbyId: action.payload.lobbyId,
        playerNames: action.payload.playerNames,
      };
      expect(newState).toMatchObject(expectedState);
    });

    it("it returns updated state when additional players join", () => {
      const initialState: State = {
        ...defaultState,
        clientId: 1,
        lobbyId: "123abc",
        playerNames: { 1: "Van" },
      };
      const action: JoinLobbyAction = {
        type: "JOIN_LOBBY",
        payload: {
          lobbyId: "123abc",
          clientId: 2,
          playerNames: {
            1: "Van",
            2: "James",
          },
        },
      };
      const newState = reducer(initialState, action);
      const expectedState: State = {
        ...initialState,
        playerNames: action.payload.playerNames,
      };
      expect(newState).toMatchObject(expectedState);
    });

    it("it returns updated state if lobbyId is different", () => {
      const initialState: State = {
        ...defaultState,
        clientId: 1,
        lobbyId: "123abc",
        playerNames: { 1: "Van" },
      };
      const action: JoinLobbyAction = {
        type: "JOIN_LOBBY",
        payload: {
          lobbyId: "456def",
          clientId: 1,
          playerNames: { 1: "Van" },
        },
      };
      const newState = reducer(initialState, action);
      const expectedState: State = {
        ...initialState,
        lobbyId: action.payload.lobbyId,
      };
      expect(newState).toMatchObject(expectedState);
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
      const action: ExitLobbyAction = {
        type: "EXIT_LOBBY",
        payload: {
          lobbyId: "456def",
          clientId: 1,
          playerNames: { 2: "James" },
        },
      };
      const newState = reducer(initialState, action);
      const expectedState: State = {
        ...initialState,
        playerNames: {},
        lobbyId: undefined,
      };
      expect(newState).toMatchObject(expectedState);
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
      const action: ExitLobbyAction = {
        type: "EXIT_LOBBY",
        payload: {
          lobbyId: "456def",
          clientId: 1,
          playerNames: { 1: "Van" },
        },
      };
      const newState = reducer(initialState, action);
      const expectedState: State = {
        ...initialState,
        playerNames: action.payload.playerNames,
      };
      expect(newState).toMatchObject(expectedState);
    });
  });

  describe("action ADD_CHAT_MESSAGE", () => {
    it("it appends to chat state", () => {
      const action: MessageAction = {
        type: "ADD_CHAT_MESSAGE",
        payload: {
          clientId: 1,
          timestamp: new Date(),
          message: "hello",
        },
      };
      const newState = reducer(defaultState, action);
      const newerState = reducer(newState, action);
      const expectedState: State = {
        ...defaultState,
        chat: [action.payload, action.payload],
      };
      expect(newerState).toMatchObject(expectedState);
    });
  });

  describe("action ADD_HISTORY_ACTION", () => {});

  describe("action UPDATE_GAME", () => {
    it("it returns updated state on initial action", () => {
      const action: SplendidAction = {
        type: "UPDATE_GAME",
        payload: game,
      };
      const newState = reducer(defaultState, action);
      const newerState = reducer(newState, action);
      const expectedState: State = {
        ...defaultState,
        game: action.payload,
      };
      expect(newerState).toMatchObject(expectedState);
      expect(newerState.game?.activePlayerIndex).toBe(0);
    });

    it("it replaces updated game", () => {
      const action: SplendidAction = {
        type: "UPDATE_GAME",
        payload: {
          ...game,
          activePlayerIndex: 1,
        },
      };
      const initialState: State = { ...defaultState, game };
      const newState = reducer(initialState, action);
      const newerState = reducer(newState, action);
      const expectedState: State = {
        ...defaultState,
        game: action.payload,
      };
      expect(newerState).toMatchObject(expectedState);
      expect(newerState.game?.activePlayerIndex).toBe(1);
    });
  });

  describe("action UPDATE_BANK_RESOURCE", () => {
    it("returns unchanged state if no game exists", () => {
      const action: SplendidResourceAction = {
        type: "UPDATE_BANK_RESOURCE",
        payload: {},
      };
      const newState = reducer(defaultState, action);
      expect(newState).toMatchObject(defaultState);
    });

    it("it inserts a blank offset bank", () => {
      const initialState: State = { ...defaultState, game };
      const action: SplendidResourceAction = {
        type: "UPDATE_BANK_RESOURCE",
        payload: {},
      };
      const newState = reducer(initialState, action);
      expect(newState.game?.board.bankOffsetTemp).toMatchObject({
        black: 0,
        white: 0,
        red: 0,
        blue: 0,
        green: 0,
        yellow: 0,
      });
    });

    it("it returns an updated offset bank", () => {
      const initialState: State = { ...defaultState, game: { ...game } };
      const action: SplendidResourceAction = {
        type: "UPDATE_BANK_RESOURCE",
        payload: { red: 1, green: 1 },
      };
      const newState = reducer(initialState, action);
      expect(newState.game?.board.bankOffsetTemp).toMatchObject({
        black: 0,
        white: 0,
        red: 1,
        blue: 0,
        green: 1,
        yellow: 0,
      });
    });
  });
});
