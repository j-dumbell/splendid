import React from "react";

import { WsResponse } from "../hooks/useWebsocket";

type ChatHistoryProps = {
  actions: WsResponse[];
};

const ChatHistory = ({ actions }: ChatHistoryProps) => {
  const messages = actions
    .filter((m) => m.action === "chat")
    .map((m) => m.details?.message) as string[];

  return messages.length ? (
    <div style={{ flex: "1" }}>
      <h2>Chat History</h2>
      <div style={{ color: "#fff" }}>
        {messages.map((m, i) => (
          <p key={i}>{m}</p>
        ))}
      </div>
    </div>
  ) : null;
};

export default ChatHistory;
