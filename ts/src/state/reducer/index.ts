import { defaultState } from "..";
import {
  State,
  JoinLobbyAction,
  MessageAction,
  HistoryAction,
  BaseAction,
  ActionType,
  WSConnectionAction,
} from "../domain";
import { gameReducer } from "./game";
import { lobbyIdReducer } from "./lobbyId";
import { playerReducers } from "./playerNames";

const chatReducer = (
  state: State["chat"] = defaultState.chat,
  action: BaseAction<ActionType, unknown>
): State["chat"] => {
  switch (action.type) {
    case "ADD_CHAT_MESSAGE":
      const messageAction = action as MessageAction;
      return state.concat(messageAction.payload);
    default:
      return state;
  }
};

const historyReducer = (
  state: State["history"] = defaultState.history,
  action: BaseAction<ActionType, unknown>
): State["history"] => {
  switch (action.type) {
    case "ADD_HISTORY_ACTION":
      const historyAction = action as HistoryAction;
      return state.concat(historyAction.payload);
    default:
      return state;
  }
};

const latestActionReducer = (
  state: State["latestAction"] = defaultState.latestAction,
  action: BaseAction<ActionType, unknown>
): State["latestAction"] => {
  switch (action.type) {
    case "ADD_LATEST_ACTION":
      const { payload } = action as HistoryAction;
      return payload;
    case "REMOVE_LATEST_ACTION":
      return undefined;
    default:
      return state;
  }
};

const connectionReducer = (
  state: State["connection"] = defaultState.connection,
  action: BaseAction<ActionType, unknown>
): State["connection"] => {
  switch (action.type) {
    case "UPDATE_CONNECTION":
      const { payload } = action as WSConnectionAction;
      return payload;
    default:
      return state;
  }
};

const clientIdReducer = (
  state: State["clientId"] = defaultState.clientId,
  action: BaseAction<ActionType, unknown>
): State["clientId"] => {
  switch (action.type) {
    case "JOIN_LOBBY":
      const { payload } = action as JoinLobbyAction;
      return payload.clientId;
    default:
      return state;
  }
};

export default (
  state: State = defaultState,
  action: BaseAction<ActionType, unknown>
): State => ({
  game: gameReducer(state.game, action),
  chat: chatReducer(state.chat, action),
  history: historyReducer(state.history, action),
  latestAction: latestActionReducer(state.latestAction, action),
  connection: connectionReducer(state.connection, action),
  lobbyId: lobbyIdReducer(state.lobbyId, action),
  clientId: clientIdReducer(state.clientId, action),
  playerNames: playerReducers(state, action, state),
});
