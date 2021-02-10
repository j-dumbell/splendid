import React from "react";
import { Field } from "formik";

import FlexContainer from "../../common/FlexContainer";
import { useActivePlayer } from "../../../hooks/useActivePlayer";

export const PlayerActionForm = ({ id }: { id: number }) => {
  const [isActivePlayer, clientId] = useActivePlayer();
  return isActivePlayer && clientId === id ? (
    <FlexContainer column style={{ marginBottom: "20px" }}>
      <label style={{ padding: "5px" }}>
        <Field type="radio" name="gameAction" value="takeResource" />
        Take resources
      </label>
      <label style={{ padding: "5px" }}>
        <Field type="radio" name="gameAction" value="buyCard" />
        Buy card
      </label>
      <label style={{ padding: "5px" }}>
        <Field type="radio" name="gameAction" value="reserveCard" />
        Reserve card
      </label>
      <button type="submit">Submit</button>
    </FlexContainer>
  ) : null;
};

export default PlayerActionForm;
