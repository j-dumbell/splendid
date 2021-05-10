import { useEffect } from "react";
import { useDispatch } from "react-redux";

import config from "../config";
import { withFixtureEnv } from "../state";
import {
  joinLobby,
  exitLobby,
  addChatMessage,
  addHistoryAction,
  updateSplendidGame,
  updateConnection,
  addLatestAction,
  removeLatestAction,
} from "../state/actionCreator";
import { HistoryActionType } from "../state/domain";
import { useCookie } from "./useCookie";

export type WsResponse = {
  action: HistoryActionType;
  ok: boolean;
  details: Record<string, any>;
};

let socket: WebSocket;
export const sendJSON = (payload: any) => socket?.send(JSON.stringify(payload));

export const useWebSocket = (path: string) => {
  const [username] = useCookie("username");
  const dispatch = useDispatch();

  useEffect(() => {
    if(withFixtureEnv) {
      dispatch(
        updateConnection({
          loading: false,
          open: true,
          error: undefined,
        })
      );
      return;
    }
    
    if (!config.apiHost) {
      dispatch(
        updateConnection({
          loading: false,
          open: false,
          error: "apiHost not set",
        })
      );
      return;
    }

    if (!socket) {
      dispatch(
        updateConnection({
          loading: true,
          open: false,
          error: undefined,
        })
      );
      const url = new URL(`ws://${config.apiHost}${path}`);
      socket = new WebSocket(url.toString());
      (window as any).ws = socket;
    }

    socket.onopen = () =>
      dispatch(
        updateConnection({
          loading: false,
          open: true,
          error: undefined,
        })
      );

    socket.onclose = () =>
      dispatch(
        updateConnection({
          loading: false,
          open: false,
          error: undefined,
        })
      );

    socket.onmessage = ({ data }) => {
      dispatch(removeLatestAction());
      const { action, details } = JSON.parse(data) as WsResponse;

      switch (action) {
        case "chat":
          dispatch(addChatMessage(details?.clientId, details?.message));
          break;
        case "join":
          dispatch(addHistoryAction(action, details));
          dispatch(
            joinLobby(details.lobbyId, details.clientId, details.playerNames)
          );
          break;
        case "exit":
          dispatch(addHistoryAction(action, details));
          dispatch(exitLobby(username, details.playerNames));
          break;
        case "game":
          if (details.game) {
            dispatch(updateSplendidGame(details.game));
          } else {
            dispatch(addLatestAction(action, details));
          }
          break;
        default:
          dispatch(addLatestAction(action, details));
      }
    };
  }, [path, username, dispatch]);

  return [];
};
