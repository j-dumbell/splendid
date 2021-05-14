import { defaultState } from "..";
import { State, ReducerAction } from "../domain";

export const lobbyIdReducer = (
  state = defaultState.lobbyId,
  action: ReducerAction
): State["lobbyId"] => {
  switch (action.type) {
    case "JOIN_LOBBY":
      const { payload } = action;
      return payload.lobbyId;
    case "EXIT_LOBBY":
      return undefined;
    default:
      return state;
  }
};
