import { defaultState } from "..";
import { State, BaseAction, ActionType, JoinLobbyAction, ExitLobbyAction } from "../domain";

export const playerReducers = (
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