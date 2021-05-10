import fixtures from "../gameFixtures.json";

import { SplendidForm, SplendidGame } from "../../components/Splendid/domain";
import {
  State,
  JoinLobbyAction,
  MessageAction,
  SplendidAction,
  HistoryAction,
  BaseAction,
  ActionType,
  ExitLobbyAction,
  WSConnectionAction,
} from "../domain";

/**
 * Create a `.env.development.local` file and set this env to
 * enable game fixtures when rendering the initial state.
 */
export const withFixtureEnv = process.env.REACT_APP_WITH_FIXTURES === "1";
const withFixtures: Partial<State> | undefined = withFixtureEnv
  ? {
      chat: new Array(50).fill({
        message: "hello i am message",
        clientId: 2,
        timestamp: new Date(),
      }),
      connection: {
        loading: false,
        open: true,
        error: undefined,
      },
      lobbyId: "abc123",
      clientId: 1,
      playerNames: {
        1: "Van",
        2: "James",
      },
      game: {
        form: {} as SplendidForm,
        response: (fixtures as unknown) as SplendidGame,
      },
    }
  : undefined;

export const defaultState: State = {
  chat: [],
  history: [],
  connection: {
    loading: false,
    open: false,
    error: undefined,
  },
  playerNames: {},
  game: {
    form: {} as SplendidForm,
  },
  ...withFixtures,
};

const gameReducer = (
  state: State["game"] = defaultState.game,
  action: BaseAction<ActionType, unknown>
): State["game"] => {
  switch (action.type) {
    case "UPDATE_GAME":
      const splendidAction = action as SplendidAction;
      return {
        ...state,
        response: splendidAction.payload,
      };
    case "EXIT_LOBBY":
      return {
        form: {} as SplendidForm,
        response: undefined,
      };
    default:
      return state;
  }
};

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

const connectionReducer = (
  state: State["connection"] = defaultState.connection,
  action: BaseAction<ActionType, unknown>
): State["connection"] => {
  switch (action.type) {
    case "UPDATE_CONNECTION":
      const { payload: connection } = action as WSConnectionAction;
      return {
        ...state,
        ...connection,
      };
    default:
      return state;
  }
};

const playerReducers = (
  state: State["playerNames"] = defaultState.playerNames,
  action: BaseAction<ActionType, unknown>,
  { lobbyId, clientId }: State
): State["playerNames"] => {
  switch (action.type) {
    case "JOIN_LOBBY":
      const {
        payload: { lobbyId: joinLobbyId, playerNames: joinPlayerNames },
      } = action as JoinLobbyAction;
      if (lobbyId === joinLobbyId && clientId) {
        return joinPlayerNames;
      }
      return joinPlayerNames;
    case "EXIT_LOBBY":
      const {
        payload: { playerNames: exitPlayerNames },
      } = action as ExitLobbyAction;
      if (clientId && exitPlayerNames[clientId]) {
        return exitPlayerNames;
      }
      return {};
    default:
      return state;
  }
};

const lobbyIdReducer = (
  state: State["lobbyId"] = defaultState.lobbyId,
  action: BaseAction<ActionType, unknown>
): State["lobbyId"] => {
  switch (action.type) {
    case "JOIN_LOBBY":
      const {
        payload: { lobbyId: joinLobbyId },
      } = action as JoinLobbyAction;
      return joinLobbyId;
    case "EXIT_LOBBY":
      return undefined;
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
      const {
        payload: { clientId: joinclientId },
      } = action as JoinLobbyAction;
      return joinclientId;
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
  connection: connectionReducer(state.connection, action),
  lobbyId: lobbyIdReducer(state.lobbyId, action),
  clientId: clientIdReducer(state.clientId, action),
  playerNames: playerReducers(state.playerNames, action, state),
});
