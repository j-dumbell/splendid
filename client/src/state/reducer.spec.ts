import { JoinLobbyAction, State } from "./domain";
import reducer, { defaultState } from "./reducer";

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

    it("it returns updated state for additional players joining", () => {
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
      const expectedState = {
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
      const expectedState = {
        ...initialState,
        lobbyId: action.payload.lobbyId,
      };
      expect(newState).toMatchObject(expectedState);
    });
  });
  describe("action EXIT_LOBBY", () => {});
  describe("action ADD_CHAT_MESSAGE", () => {});
  describe("action ADD_HISTORY_ACTION", () => {});
  describe("action UPDATE_GAME", () => {});
  describe("action UPDATE_BANK_RESOURCE", () => {});
});
