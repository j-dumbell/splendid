import { SplendidGame } from "../components/Splendid/domain";

export type Message = {
  message: string;
  timestamp: Date;
};

const historyActionTypes = ["create", "join", "exit", "chat", "game"] as const;
export type HistoryActionType = typeof historyActionTypes[number];
export type History = {
  action: HistoryActionType;
  details: any;
  timestamp: Date;
};

export type State = {
  chat: Message[];
  history: History[];
  game?: SplendidGame;
};

export const actionTypes = [
  "ADD_CHAT_MESSAGE",
  "UPDATE_GAME",
  "ADD_HISTORY_ACTION",
] as const;
export type ActionType = typeof actionTypes[number];

export type BaseAction<T, P> = {
  type: T;
  payload: P;
};

export type MessageAction = BaseAction<typeof actionTypes[0], Message>;
export type SplendidAction = BaseAction<typeof actionTypes[1], SplendidGame>;
export type HistoryAction = BaseAction<typeof actionTypes[2], History>;
