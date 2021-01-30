import {
  State,
  JoinLobbyAction,
  MessageAction,
  SplendidAction,
  HistoryAction,
  BaseAction,
  ActionType,
  ExitLobbyAction,
} from "./domain";

const defaultState: State = {
  chat: [],
  history: [],
  playerNames: {},
};

function reducer(
  state: State = defaultState,
  action: BaseAction<ActionType, unknown>
): State {
  switch (action.type) {
    case "JOIN_LOBBY":
      const { payload: joinLobbyPayload } = action as JoinLobbyAction;
      return {
        ...state,
        lobbyId: joinLobbyPayload.id,
        playerNames: joinLobbyPayload.playerNames,
      };
    case "EXIT_LOBBY":
      const { payload: exitLobbyPayload } = action as ExitLobbyAction;
      if (
        Object.values(exitLobbyPayload.playerNames).includes(
          exitLobbyPayload.username
        )
      ) {
        return {
          ...state,
          playerNames: exitLobbyPayload.playerNames,
        };
      }
      return {
        ...state,
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
    default:
      return state;
  }
}

export default reducer;
