import { defaultState } from "..";
import { constructEmptyResourceList } from "../../components/Splendid/util";
import { State, ReducerAction } from "../domain";

export const gameReducer = (
  state = defaultState.game,
  action: ReducerAction
): State["game"] => {
  switch (action.type) {
    case "UPDATE_GAME":
      return {
        ...state,
        response: action.payload,
      };
    case "EXIT_LOBBY":
      return {
        form: {
          selectedCard: "",
          resources: constructEmptyResourceList(),
        },
        response: undefined,
      };
    default:
      return state;
  }
};
