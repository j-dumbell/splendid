import { useRef, useEffect, useState } from "react";

import config from "../config";

export const useWebSocket = (path: string) => {
  const ws = useRef<WebSocket>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<any>();

  useEffect(() => {
    if (!config.apiUrl) {
      const errorMessage = "apiUrl not set";
      setError(errorMessage);
      return;
    }

    const url = new URL(`ws://${config.apiUrl}${path}`);
    ws.current = new WebSocket(url.toString());
    (window as any).ws = ws.current;

    setLoading(true);
    if (ws.current) {
      ws.current.onopen = () => {
        const status = "connection opened";
        setMessage(status);
        setLoading(false);
      };

      ws.current.onclose = () => {
        const status = "connection closed";
        setMessage(status);
      };

      ws.current.onmessage = ({ data }) => {
        console.log("message received", data);
        let parsed: any;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          parsed = data;
        }
        setMessage(parsed);
      };
    }

    return () => ws.current && ws.current.close();
  }, [path]);

  return [loading, error, message];
};
