import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import config from "../config";
import {
  addChatMessage,
  addHistoryAction,
  updateSplendidGame,
} from "../state/actionCreator";
import { HistoryActionType } from "../state/domain";
import { useCookie } from "./useCookie";

export type WsStatus = "open" | "closed" | "loading";
export type WsResponse = {
  action: HistoryActionType;
  ok: boolean;
  details: Record<string, any>;
};

export const sendJSON = (payload: any) => socket?.send(JSON.stringify(payload));

let socket: WebSocket;

export const useWebSocket = (path: string) => {
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<WsStatus>();
  const [, setLobbyId, removeLobbyId] = useCookie("lobbyId");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!config.apiUrl) {
      const errorMessage = "apiUrl not set";
      setError(errorMessage);
      return;
    }

    if (!socket) {
      setStatus("loading");
      const url = new URL(`ws://${config.apiUrl}${path}`);
      socket = new WebSocket(url.toString());
      (window as any).ws = socket;
    }

    socket.onopen = () => setStatus("open");
    socket.onclose = () => setStatus("closed");
    socket.onmessage = ({ data }) => {
      const response = JSON.parse(data) as WsResponse;
      if (response?.details?.game) {
        dispatch(updateSplendidGame(response.details.game));
      }
      if (response.action !== "chat") {
        dispatch(addHistoryAction(response.action, response.details));
      } else {
        dispatch(addChatMessage(response?.details?.message));
      }
      switch (response.action) {
        case "join":
          setLobbyId(response?.details?.lobbyId);
          break;
        case "exit":
          removeLobbyId();
          break;
      }
    };
  }, [path, setLobbyId, removeLobbyId, dispatch]);

  return [status, error];
};
