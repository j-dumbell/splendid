import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { State } from "../../reducers/domain";
import Text from "../common/Text";

const formatTimestamp = (t: Date) => `${t.getUTCHours()}:${t.getUTCMinutes()}`;

const Timestamp = styled.span`
  color: #ac81fe;
`;

const ChatHistory = () => {
  const chat = useSelector((state: State) => state.chat);
  if (!chat.length) {
    return null;
  }
  return (
    <>
      <h2>Chat History</h2>
      <div>
        {chat.map((m, i) => (
          <Text key={`message-${i}`} color="white">
            <Timestamp>{formatTimestamp(m.timestamp)}</Timestamp> {m.message}
          </Text>
        ))}
      </div>
    </>
  );
};

export default ChatHistory;
