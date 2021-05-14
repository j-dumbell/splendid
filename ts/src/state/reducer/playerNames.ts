import { defaultState } from "..";
import { State, ReducerAction } from "../domain";

export const playerReducers = (
  state = defaultState.playerNames,
  action: ReducerAction,
  { lobbyId, clientId }: State
): State["playerNames"] => {
  switch (action.type) {
    case "JOIN_LOBBY":
      const {
        payload: { lobbyId: joinLobbyId, playerNames: joinPlayerNames },
      } = action;
      if (lobbyId === joinLobbyId && clientId) {
        return joinPlayerNames;
      }
      return joinPlayerNames;
    case "EXIT_LOBBY":
      const {
        payload: { playerNames: exitPlayerNames },
      } = action;
      if (clientId && exitPlayerNames[clientId]) {
        return exitPlayerNames;
      }
      return {};
    default:
      return state;
  }
};
