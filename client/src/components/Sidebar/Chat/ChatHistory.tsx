import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { State } from "../../../state/domain";
import Scrollable from "../../common/Scrollable";
import Text from "../../common/Text";

const formatTimestamp = (t: Date) => `${t.getUTCHours()}:${t.getUTCMinutes()}`;

const Timestamp = styled.span`
  color: #ac81fe;
`;

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<any>();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const ChatHistory = () => {
  const { chat, playerNames } = useSelector(({ chat, playerNames }: State) => ({
    chat,
    playerNames,
  }));
  return (
    <>
      <h3>Chat History</h3>
      <Scrollable>
        {chat.map((m, i) => (
          <Text key={`message-${i}`} color="white">
            <Timestamp>
              {formatTimestamp(m.timestamp)} [{playerNames[m.clientId]}]{" "}
            </Timestamp>
            {m.message}
          </Text>
        ))}
        <AlwaysScrollToBottom />
      </Scrollable>
    </>
  );
};

export default ChatHistory;
