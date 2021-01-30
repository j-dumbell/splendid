import { SplendidGame } from "../components/Splendid/domain";
import {
  JoinLobbyAction,
  ExitLobbyAction,
  HistoryAction,
  HistoryActionType,
  MessageAction,
  SplendidAction,
} from "./domain";

export const joinLobby = (
  username: string,
  id: string,
  playerNames: Record<number, string>
): JoinLobbyAction => ({
  type: "JOIN_LOBBY",
  payload: { username, id, playerNames },
});

export const exitLobby = (
  username: string,
  playerNames: Record<number, string>
): ExitLobbyAction => ({
  type: "EXIT_LOBBY",
  payload: { username, playerNames },
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
