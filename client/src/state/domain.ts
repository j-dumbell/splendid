import { SplendidGame } from "../components/Splendid/domain";

export type Message = {
  message: string;
  timestamp: Date;
};

export type State = {
  chat: Message[];
  game?: SplendidGame;
};

export const actionTypes = ["ADD_CHAT_MESSAGE", "UPDATE_GAME"] as const;
export type ActionType = typeof actionTypes[number];

export type BaseAction<T, P> = {
  type: T;
  payload: P;
};

export type MessageAction = BaseAction<typeof actionTypes[0], Message>;
export type SplendidAction = BaseAction<typeof actionTypes[1], SplendidGame>;
