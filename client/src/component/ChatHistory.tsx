import React from "react";
import { WsResponse } from "../hooks/websocket";

type ChatHistoryProps = {
  actions: WsResponse[];
};

const ChatHistory = ({ actions }: ChatHistoryProps) => {
  const messages = actions
    .filter((m) => m.category === "chat")
    .map((m) => m.body?.message) as string[];

  return messages.length ? (
    <div style={{ flex: "1" }}>
      <h2>Chat History</h2>
      <div style={{ color: "#fff" }}>
        {messages.map((m) => (
          <p>{m}</p>
        ))}
      </div>
    </div>
  ) : null;
};

export default ChatHistory;
