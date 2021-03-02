import fixtures from "./gameFixtures.json";

import { SplendidGame } from "../components/Splendid/domain";
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
} from "./domain";

/**
 * Create a `.env.development.local` file and set this env to
 * enable game fixtures when rendering the initial state.
 */
const withFixtureEnv = process.env.REACT_APP_WITH_FIXTURES === "1";
const withFixtures: Partial<State> | undefined = withFixtureEnv
  ? {
      lobbyId: "abc123",
      chat: new Array(50).fill({
        message: "hello i am message",
        clientId: 2,
        timestamp: new Date(),
      }),
      playerNames: {
        1: "Van",
        2: "James",
      },
      connection: {
        loading: false,
        open: true,
        error: undefined,
      },
      clientId: 1,
      game: (fixtures as unknown) as SplendidGame,
    }
  : undefined;

export const defaultState: State = {
  chat: [],
  history: [],
  playerNames: {},
  connection: {
    loading: false,
    open: false,
    error: undefined,
  },
  ...withFixtures,
};

function reducer(
  state: State = defaultState,
  action: BaseAction<ActionType, unknown>
): State {
  switch (action.type) {
    case "UPDATE_CONNECTION":
      const { payload: connection } = action as WSConnectionAction;
      return {
        ...state,
        connection,
      };
    case "JOIN_LOBBY":
      const {
        payload: {
          lobbyId: joinLobbyId,
          clientId: joinClientId,
          playerNames: joinPlayerNames,
        },
      } = action as JoinLobbyAction;
      if (state.lobbyId === joinLobbyId && state.clientId) {
        return {
          ...state,
          playerNames: joinPlayerNames,
        };
      }
      return {
        ...state,
        playerNames: joinPlayerNames,
        lobbyId: joinLobbyId,
        clientId: joinClientId,
      };
    case "EXIT_LOBBY":
      const {
        payload: { playerNames: exitPlayerNames },
      } = action as ExitLobbyAction;
      if (state.clientId && exitPlayerNames[state.clientId]) {
        return {
          ...state,
          playerNames: exitPlayerNames,
        };
      }
      return {
        ...state,
        playerNames: {},
        lobbyId: undefined,
        history: [],
        chat: [],
        game: undefined,
      };
    case "ADD_CHAT_MESSAGE":
      const messageAction = action as MessageAction;
      return {
        ...state,
        chat: state.chat.concat(messageAction.payload),
      };
    case "ADD_HISTORY_ACTION":
      const historyAction = action as HistoryAction;
      return {
        ...state,
        history: state.history.concat(historyAction.payload),
      };
    case "ADD_LATEST_ACTION":
      const latestAction = action as HistoryAction;
      return {
        ...state,
        latestAction: latestAction.payload,
      };
    case "REMOVE_LATEST_ACTION":
      return {
        ...state,
        latestAction: undefined,
      };
    case "UPDATE_GAME":
      const splendidAction = action as SplendidAction;
      return {
        ...state,
        game: splendidAction.payload,
      };
    default:
      return state;
  }
}

export default reducer;
