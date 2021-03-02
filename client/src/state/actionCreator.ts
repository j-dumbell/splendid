import { SplendidGame } from "../components/Splendid/domain";
import {
  JoinLobbyAction,
  ExitLobbyAction,
  HistoryAction,
  HistoryActionType,
  MessageAction,
  SplendidAction,
  WSConnectionAction,
  WSConnection,
} from "./domain";

export const joinLobby = (
  lobbyId: string,
  clientId: number,
  playerNames: Record<number, string>
): JoinLobbyAction => ({
  type: "JOIN_LOBBY",
  payload: { lobbyId, clientId, playerNames },
});

export const exitLobby = (
  clientId: number,
  playerNames: Record<number, string>
): ExitLobbyAction => ({
  type: "EXIT_LOBBY",
  payload: { clientId, playerNames },
});

export const addChatMessage = (
  clientId: number,
  message: string
): MessageAction => ({
  type: "ADD_CHAT_MESSAGE",
  payload: {
    clientId,
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

export const updateConnection = (
  payload: WSConnection
): WSConnectionAction => ({
  type: "UPDATE_CONNECTION",
  payload,
});
