import { useEffect, useState } from "react";

import config from "../config";

export type WsStatus = "open" | "closed" | "loading";
export type WsResponse = {
  category: "create" | "join" | "exit" | "chat";
  body: Record<string, unknown>;
};

export const sendJSON = (payload: any) => socket?.send(JSON.stringify(payload));

let socket: WebSocket;

export const useWebSocket = (path: string) => {
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<WsStatus>();
  const [actions, setActions] = useState<WsResponse[]>([]);

  useEffect(() => {
    setStatus("loading");
    if (!config.apiUrl) {
      const errorMessage = "apiUrl not set";
      setError(errorMessage);
      return;
    }
    if (!socket) {
      const url = new URL(`ws://${config.apiUrl}${path}`);
      socket = new WebSocket(url.toString());
      (window as any).ws = socket;
    }
    socket.onopen = () => setStatus("open");
    socket.onclose = () => setStatus("closed");
    socket.onmessage = ({ data }) => {
      const response = JSON.parse(data) as WsResponse;
      setActions((actions) => actions.concat(response));
    };
  }, [path]);

  return [status, error, actions];
};
