import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import Scrollable from "../../common/Scrollable";
import Text from "../../common/Text";
import { Timestamp } from "./styled";

const formatTimestamp = (t: Date) => `${t.getUTCHours()}:${t.getUTCMinutes()}`;

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<any>();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const ChatHistory = () => {
  const chat = useSelector(({ chat }: State) => chat);
  return (
    <>
      <h3>Chat History</h3>
      <Scrollable>
        {chat.map((m, i) => (
          <Text key={`message-${i}`} color="white">
            <Timestamp>{formatTimestamp(m.timestamp)}</Timestamp> {m.message}
          </Text>
        ))}
        <AlwaysScrollToBottom />
      </Scrollable>
    </>
  );
};

export default ChatHistory;
