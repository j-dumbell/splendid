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

const defaultState: State = {
  clientId: 2,
  chat: [],
  history: [],
  playerNames: {},
  game: (fixtures as unknown) as SplendidGame,
  isActivePlayer: true,
};

function reducer(
  state: State = defaultState,
  action: BaseAction<ActionType, unknown>
): State {
  switch (action.type) {
    case "JOIN_LOBBY":
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
        isActivePlayer:
          splendidAction.payload.players[
            splendidAction.payload.activePlayerIndex
          ].id === state.clientId,
      };
    case "UPDATE_PLAYER_RESOURCE":
      const splendidResourceAction = action as SplendidResourceAction;
      const newstate = {
        ...state,
        game: {
          ...state.game!,
          players: state.game!.players.map((player) => {
            if (player.id !== state.clientId) {
              return player;
            }
            return {
              ...player,
              bankOffsetTemp: splendidResourceAction.payload,
            };
          }),
        },
      };
      console.log('@@@', newstate.game.players);

      return newstate;
    default:
      return state;
  }
}

export default reducer;
