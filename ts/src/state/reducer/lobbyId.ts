import { defaultState } from "..";
import { State, BaseAction, ActionType, JoinLobbyAction } from "../domain";

export const lobbyIdReducer = (
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
