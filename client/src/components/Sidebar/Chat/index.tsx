import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import Text from "../../common/Text";
import ChatForm from './ChatForm';
import { MaxHeightContainer, Timestamp } from './styled';

const formatTimestamp = (t: Date) => `${t.getUTCHours()}:${t.getUTCMinutes()}`;

const ChatHistory = () => {
  const chat = useSelector(({ chat }: State) => chat);
  if (!chat.length) {
    return null;
  }
  return (
    <>
      <h2>Chat History</h2>
      <MaxHeightContainer>
        {chat.map((m, i) => (
          <Text key={`message-${i}`} color="white">
            <Timestamp>{formatTimestamp(m.timestamp)}</Timestamp> {m.message}
          </Text>
        ))}
      </MaxHeightContainer>
      <ChatForm />
    </>
  );
};

export default ChatHistory;
