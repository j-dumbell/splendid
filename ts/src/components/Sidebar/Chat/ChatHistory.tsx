import React from "react";
import { useSelector } from "react-redux";

import { usePlayerNames } from "../../../hooks/usePlayerNames";
import { State } from "../../../state/domain";
import History from "../ActionHistory/History";

const ChatHistory = () => {
  const [playerNames] = usePlayerNames();
  const chat = useSelector(({ chat }: State) => chat);

  const mapped = chat.map(({ timestamp, clientId, message }) => ({
    timestamp,
    name: playerNames[clientId],
    message,
  }));

  return <History history={mapped} />;
};

export default ChatHistory;
