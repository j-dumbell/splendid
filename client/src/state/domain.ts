import { SplendidGame, SplendidResourceList } from "../components/Splendid/domain";

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

export type Lobby = {
  lobbyId?: string;
  clientId: number;
  playerNames: Record<number, string>;
};

export type State = {
  lobbyId?: string;
  clientId?: number;
  chat: Message[];
  history: History[];
  game?: SplendidGame;
  playerNames: Record<number, string>;
};

export const actionTypes = [
  "JOIN_LOBBY",
  "EXIT_LOBBY",
  "ADD_CHAT_MESSAGE",
  "ADD_HISTORY_ACTION",
  "UPDATE_GAME",
  "UPDATE_PLAYER_RESOURCE",
] as const;
export type ActionType = typeof actionTypes[number];

export type BaseAction<T, P> = {
  type: T;
  payload: P;
};

export type JoinLobbyAction = BaseAction<typeof actionTypes[0], Lobby>;
export type ExitLobbyAction = BaseAction<typeof actionTypes[1], Lobby>;
export type MessageAction = BaseAction<typeof actionTypes[2], Message>;
export type HistoryAction = BaseAction<typeof actionTypes[3], History>;
export type SplendidAction = BaseAction<typeof actionTypes[4], SplendidGame>;
export type SplendidResourceAction = BaseAction<typeof actionTypes[5], SplendidResourceList>;
