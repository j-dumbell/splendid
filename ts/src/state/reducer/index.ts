import { defaultState } from "..";
import { State, ReducerAction } from "../domain";
import { gameReducer } from "./game";
import { lobbyIdReducer } from "./lobbyId";
import { playerReducers } from "./playerNames";

const chatReducer = (
  state = defaultState.chat,
  action: ReducerAction
): State["chat"] => {
  switch (action.type) {
    case "ADD_CHAT_MESSAGE":
      return state.concat(action.payload);
    default:
      return state;
  }
};

const historyReducer = (
  state = defaultState.history,
  action: ReducerAction
): State["history"] => {
  switch (action.type) {
    case "ADD_HISTORY_ACTION":
      return state.concat(action.payload);
    default:
      return state;
  }
};

const latestActionReducer = (
  state = defaultState.latestAction,
  action: ReducerAction
): State["latestAction"] => {
  switch (action.type) {
    case "ADD_LATEST_ACTION":
      return action.payload;
    case "REMOVE_LATEST_ACTION":
      return undefined;
    default:
      return state;
  }
};

const connectionReducer = (
  state = defaultState.connection,
  action: ReducerAction
): State["connection"] => {
  switch (action.type) {
    case "UPDATE_CONNECTION":
      return action.payload;
    default:
      return state;
  }
};

const clientIdReducer = (
  state = defaultState.clientId,
  action: ReducerAction
): State["clientId"] => {
  switch (action.type) {
    case "JOIN_LOBBY":
      return action.payload.clientId;
    default:
      return state;
  }
};

/** Custom "combineReducer" function as some reducers require access to global state */
export default (state: State = defaultState, action: ReducerAction): State => ({
  game: gameReducer(state.game, action),
  chat: chatReducer(state.chat, action),
  history: historyReducer(state.history, action),
  latestAction: latestActionReducer(state.latestAction, action),
  connection: connectionReducer(state.connection, action),
  lobbyId: lobbyIdReducer(state.lobbyId, action),
  clientId: clientIdReducer(state.clientId, action),
  playerNames: playerReducers(state.playerNames, action, state),
});
