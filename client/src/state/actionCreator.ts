import { SplendidGame } from "../components/Splendid/domain";
import {
  JoinLobbyAction,
  ExitLobbyAction,
  HistoryAction,
  HistoryActionType,
  MessageAction,
  SplendidAction,
} from "./domain";

export const joinLobby = (id: string): JoinLobbyAction => ({
  type: "JOIN_LOBBY",
  payload: { id },
});

export const exitLobby = (): ExitLobbyAction => ({
  type: "EXIT_LOBBY",
  payload: undefined,
});

export const addChatMessage = (message: string): MessageAction => ({
  type: "ADD_CHAT_MESSAGE",
  payload: {
    message,
    timestamp: new Date(),
  },
});

export const updateSplendidGame = (payload: SplendidGame): SplendidAction => ({
  type: "UPDATE_GAME",
  payload,
});

export const addHistoryAction = (
  actionType: HistoryActionType,
  details: any
): HistoryAction => ({
  type: "ADD_HISTORY_ACTION",
  payload: {
    details,
    action: actionType,
    timestamp: new Date(),
  },
});
