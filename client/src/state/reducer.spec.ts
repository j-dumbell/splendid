import reducer, { defaultState } from "./reducer";

describe("reducer()", () => {
  describe("action JOIN_LOBBY", () => {
    it("it returns a default state", () => {
      const newState = reducer(defaultState, { type: "JOIN_LOBBY", payload: {} });
      expect(newState).toMatchObject(defaultState);
    });
  });
  describe("action EXIT_LOBBY", () => {});
  describe("action ADD_CHAT_MESSAGE", () => {});
  describe("action ADD_HISTORY_ACTION", () => {});
  describe("action UPDATE_GAME", () => {});
  describe("action UPDATE_BANK_RESOURCE", () => {});
});
