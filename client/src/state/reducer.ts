import fixtures from "./gameFixtures.json";

import {
  SplendidGame,
  SplendidResourceList,
} from "../components/Splendid/domain";
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

const isActivePlayer = (game: SplendidGame, clientId?: number) =>
  game.players[game.activePlayerIndex].id === clientId;

const playersWithOffsets = (
  game: SplendidGame,
  bankOffset: SplendidResourceList,
  clientId?: number
) => {
  const players = game.players.map((player) => ({
    ...player,
    bankOffsetTemp: player.id === clientId ? bankOffset : undefined,
  }));
  return { ...game, players };
};

const defaultState: State = {
  chat: [],
  history: [],
  playerNames: {},
  isActivePlayer: true,
  game: (fixtures as unknown) as SplendidGame,
  clientId: 2,
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
        isActivePlayer: isActivePlayer(splendidAction.payload, state.clientId),
      };
    case "UPDATE_PLAYER_RESOURCE":
      const splendidResourceAction = action as SplendidResourceAction;
      return {
        ...state,
        game: playersWithOffsets(
          state.game!,
          splendidResourceAction.payload,
          state.clientId
        ),
      };
    default:
      return state;
  }
}

export default reducer;
