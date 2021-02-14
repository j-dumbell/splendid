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
  SplendidResourceAction,
} from "./domain";
import { constructEmptyResourceList } from "../components/Splendid/helpers";

/**
 * Create a `.env.development.local` file and set this env to
 * enable game fixtures when rendering the initial state.
 */
export const withFixtureEnv = process.env.REACT_APP_WITH_FIXTURES === "1";

const withFixtures: Partial<State> | undefined = withFixtureEnv
  ? {
      lobbyId: "abc123",
      chat: new Array(50).fill({
        message: "hello i am message",
        timestamp: new Date(),
      }),
      clientId: 1,
      game: (fixtures as unknown) as SplendidGame,
    }
  : undefined;

const defaultState: State = {
  chat: [],
  history: [],
  playerNames: {},
  ...withFixtures,
};

function reducer(
  state: State = defaultState,
  action: BaseAction<ActionType, unknown>
): State {
  switch (action.type) {
    case "JOIN_LOBBY":
      if (state.clientId && state.lobbyId) {
        return state;
      }
      const {
        payload: {
          lobbyId: joinLobbyId,
          clientId: joinClientId,
          playerNames: joinPlayerNames,
        },
      } = action as JoinLobbyAction;
      return {
        ...state,
        lobbyId: joinLobbyId,
        clientId: joinClientId,
        playerNames: joinPlayerNames,
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
    case "UPDATE_GAME":
      const splendidAction = action as SplendidAction;
      return {
        ...state,
        game: splendidAction.payload,
      };
    case "UPDATE_BANK_RESOURCE":
      const splendidResourceAction = action as SplendidResourceAction;
      return {
        ...state,
        game: {
          ...state.game!,
          board: {
            ...state.game!.board,
            bankOffsetTemp: {
              ...constructEmptyResourceList(),
              ...state.game!.board.bankOffsetTemp,
              ...splendidResourceAction.payload,
            },
          },
        },
      };
    default:
      return state;
  }
}

export default reducer;
