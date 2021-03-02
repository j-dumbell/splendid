import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import config from "../config";
import {
  joinLobby,
  exitLobby,
  addChatMessage,
  addHistoryAction,
  updateSplendidGame,
  updateConnection,
} from "../state/actionCreator";
import { HistoryActionType } from "../state/domain";
import { withFixtureEnv } from "../state/reducer";
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
  const [username] = useCookie("username");
  const [error, setError] = useState<string>();
  const [status, setStatus] = useState<WsStatus>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!config.apiUrl) {
      const errorMessage = "apiUrl not set";
      setError(errorMessage);
      return;
    }

    if (!socket) {
      setStatus("loading");
      dispatch(updateConnection({ loading: true, open: false }));
      const url = new URL(`ws://${config.apiUrl}${path}`);
      socket = new WebSocket(url.toString());
      (window as any).ws = socket;
    }

    socket.onopen = () => {
      setStatus("open");
      dispatch(updateConnection({ loading: false, open: true }));
    };
    socket.onclose = () => {
      setStatus(withFixtureEnv ? "open" : "closed");
      dispatch(updateConnection({ loading: false, open: false }));
    };
    socket.onmessage = ({ data }) => {
      const response = JSON.parse(data) as WsResponse;
      switch (response.action) {
        case "chat":
          dispatch(
            addChatMessage(
              response?.details?.clientId,
              response?.details?.message
            )
          );
          break;
        case "join":
          dispatch(
            joinLobby(
              response.details.lobbyId,
              response.details.clientId,
              response.details.playerNames
            )
          );
          dispatch(addHistoryAction(response.action, response.details));
          break;
        case "exit":
          dispatch(exitLobby(username, response.details.playerNames));
          dispatch(addHistoryAction(response.action, response.details));
          break;
        case "game":
          dispatch(updateSplendidGame(response.details.game));
          break;
      }
    };
  }, [path, username, dispatch]);

  return [status, error];
};
