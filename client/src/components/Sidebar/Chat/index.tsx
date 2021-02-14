import React from "react";

import { useLobbyId } from "../../../hooks/useLobbyId";
import ChatHistory from './ChatHistory';
import ChatForm from './ChatForm';

const Chat = () => {
  const [lobbyId] = useLobbyId();
  if (!lobbyId) {
    return null;
  }
  return (
    <>
      <h2>Chat History</h2>
      <ChatHistory />
      <ChatForm />
    </>
  );
};

export default Chat;
