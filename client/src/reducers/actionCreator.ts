import { MessageAction } from "./domain";

export const addChatMessage = (
  message: string
): MessageAction => ({
  type: "ADD_CHAT_MESSAGE",
  payload: {
    message,
    timestamp: new Date(),
  },
});
