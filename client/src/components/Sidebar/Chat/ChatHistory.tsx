import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import Scrollable from "../../common/Scrollable";
import Text from "../../common/Text";
import { Timestamp } from "./styled";

const formatTimestamp = (t: Date) => `${t.getUTCHours()}:${t.getUTCMinutes()}`;

const ChatHistory = () => {
  const chat = useSelector(({ chat }: State) => chat);
  return (
    <Scrollable>
      {chat.map((m, i) => (
        <Text key={`message-${i}`} color="white">
          <Timestamp>{formatTimestamp(m.timestamp)}</Timestamp> {m.message}
        </Text>
      ))}
    </Scrollable>
  );
};

export default ChatHistory;
