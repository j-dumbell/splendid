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
      <ChatHistory />
      <ChatForm />
    </>
  );
};

export default Chat;
