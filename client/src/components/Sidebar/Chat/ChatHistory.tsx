import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import History from "../ActionHistory/History";

const ChatHistory = () => {
  const { chat, playerNames } = useSelector(({ chat, playerNames }: State) => ({
    chat,
    playerNames,
  }));

  const mapped = chat.map(({ timestamp, clientId, message }) => ({
    timestamp,
    name: playerNames[clientId],
    message,
  }));

  return <History title="Chat History" history={mapped} />;
};

export default ChatHistory;
