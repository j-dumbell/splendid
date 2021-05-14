import React, { useEffect, useRef } from "react";

import Scrollable from "../../common/Scrollable";
import Text from "../../common/Text";

const formatTimestamp = (t: Date) => `${t.getUTCHours()}:${t.getUTCMinutes()}`;

type Props = {
  title?: string;
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
      {title && <h3>{title}</h3>}
      <Scrollable>
        {history.map(({ timestamp, message, name }, i) => (
          <p key={i}>
            <Text color="#ac81fe">
              {`${formatTimestamp(timestamp)}: `}
              {name && `${name} `}
            </Text>
            <Text color="white">{message}</Text>
          </p>
        ))}
        <AlwaysScrollToBottom />
      </Scrollable>
    </>
  );
};

export default History;
