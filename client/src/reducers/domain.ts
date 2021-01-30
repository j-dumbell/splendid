export type Message = {
  clientId: number;
  message: string;
  timestamp: Date;
};

export type State = {
  chat: Message[];
};

export const actionTypes = ["ADD_CHAT_MESSAGE"] as const;

type BaseAction<T> = {
  type: typeof actionTypes[number];
  payload: T;
};

export type Action = BaseAction<Message>;