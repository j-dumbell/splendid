import { defaultState } from "..";
import { SplendidForm } from "../../components/Splendid/domain";
import { State, BaseAction, ActionType, SplendidAction } from "../domain";

export const gameReducer = (
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
