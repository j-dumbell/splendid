import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import Scrollable from "../../common/Scrollable";
import Text from "../../common/Text";

const formatTimestamp = (t: Date) => `${t.getUTCHours()}:${t.getUTCMinutes()}`;

const Timestamp = styled.span`
  color: #ac81fe;
`;

type Props = {
  title: string;
  history: {
    timestamp: Date;
    message: string;
    name?: string;
  }[];
};

const AlwaysScrollToBottom = () => {
  const elementRef = useRef<any>();
  useEffect(() => elementRef.current.scrollIntoView());
  return <div ref={elementRef} />;
};

const History = ({ title, history }: Props) => {
  if (!history.length) {
    return null;
  }
  return (
    <>
      <h3>{title}</h3>
      <Scrollable>
        {history.map(({ timestamp, message, name }) => (
          <Text color="white">
            <Timestamp>
              {`${formatTimestamp(timestamp)}: `}
              {name && `${name} `}
            </Timestamp>
            {message}
          </Text>
        ))}
        <AlwaysScrollToBottom />
      </Scrollable>
    </>
  );
};

export default History;
