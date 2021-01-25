import React from "react";

import { WsResponse } from "../../hooks/useWebsocket";
import Text from "../common/Text";

type ChatHistoryProps = {
  actions: WsResponse[];
};

const ChatHistory = ({ actions }: ChatHistoryProps) => {
  const messages = actions
    .filter((m) => m.action === "chat")
    .map((m) => m.details?.message) as string[];

  return messages.length ? (
    <>
      <h2>Chat History</h2>
      <div>
        {messages.map((m, i) => (
          <Text key={`message-${i}`} color="white">
            {m}
          </Text>
        ))}
      </div>
    </>
  ) : null;
};

export default ChatHistory;
