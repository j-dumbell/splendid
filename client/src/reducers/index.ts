import { State, Action } from "./domain";

const defaultState: State = {
  chat: [],
};

function reducer(state = defaultState, action: Action): State {
  switch (action.type) {
    case "ADD_CHAT_MESSAGE":
      return {
        ...state,
        chat: state.chat.concat(action.payload),
      };
    default:
      return state;
  }
}

export default reducer;
