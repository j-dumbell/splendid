import { SplendidForm, SplendidGame } from "../components/Splendid/domain";

export type Message = {
  clientId: number;
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

export type WSConnection = {
  loading: boolean;
  open: boolean;
  error: string | undefined;
};

export type State = {
  chat: Message[];
  history: History[];
  latestAction?: History;
  connection: WSConnection;
  lobbyId?: string;
  clientId?: number;
  playerNames: Record<number, string>;
  game: {
    form: SplendidForm,
    response?: SplendidGame,
  };
};

export const actionTypes = [
  "JOIN_LOBBY",
  "EXIT_LOBBY",
  "ADD_CHAT_MESSAGE",
  "ADD_HISTORY_ACTION",
  "ADD_LATEST_ACTION",
  "REMOVE_LATEST_ACTION",
  "UPDATE_GAME",
  "UPDATE_CONNECTION",
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
export type AddLatestAction = BaseAction<typeof actionTypes[4], History>;
export type RemoveLatestAction = BaseAction<typeof actionTypes[5], undefined>;
export type SplendidAction = BaseAction<typeof actionTypes[6], SplendidGame>;
export type WSConnectionAction = BaseAction<typeof actionTypes[7], WSConnection>;
