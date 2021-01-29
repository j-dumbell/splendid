import { useEffect, useState } from "react";

import config from "../config";
import { useCookie } from "./useCookie";

export type WsStatus = "open" | "closed" | "loading";
export type WsResponse<T> = {
  action: "create" | "join" | "exit" | "chat";
  ok: boolean;
  details: Record<string, T>;
};

export const sendJSON = (payload: any) => socket?.send(JSON.stringify(payload));

let socket: WebSocket;

export const useWebSocket = (path: string) => {
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<WsStatus>();
  const [actions, setActions] = useState<WsResponse<any>[]>([]);
  const [, setLobbyId, removeLobbyId] = useCookie("lobbyId");

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
      const response = JSON.parse(data) as WsResponse<any>;
      setActions((actions) => actions.concat(response));

      switch (response.action) {
        case "join":
          setLobbyId(response?.details?.lobbyId);
          break;
        case "exit":
          removeLobbyId();
      }
    };
  }, [path, actions, setLobbyId, removeLobbyId]);

  return [status, error, actions];
};
