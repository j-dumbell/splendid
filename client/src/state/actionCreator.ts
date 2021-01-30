import { SplendidGame } from "../components/Splendid/domain";
import { MessageAction, SplendidAction } from "./domain";

export const addChatMessage = (message: string): MessageAction => ({
  type: "ADD_CHAT_MESSAGE",
  payload: {
    message,
    timestamp: new Date(),
  },
});

export const updateSplendidGame = (game: SplendidGame): SplendidAction => ({
  type: "UPDATE_GAME",
  payload: game,
});
