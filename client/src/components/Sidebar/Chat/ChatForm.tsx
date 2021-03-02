import React from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";

import { sendJSON } from "../../../hooks/useWebsocket";
import { useLobbyId } from "../../../hooks/useLobbyId";
import Button from "../../common/Button";
import { FlexForm, FlexField } from "../../common/FlexContainer";
import { State } from "../../../state/domain";

const SendChatForm = () => {
  const [lobbyId] = useLobbyId();
  const clientId = useSelector(({ clientId }: State) => clientId);

  if (!lobbyId) {
    return null;
  }
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={({ message }, { resetForm, setSubmitting }) => {
        sendJSON({ action: "chat", params: { message, clientId } });
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <FlexField
            type="text"
            name="message"
            placeholder="Message"
            required
          />
          <Button big type="submit" disabled={isSubmitting}>
            Send
          </Button>
        </FlexForm>
      )}
    </Formik>
  );
};

export default SendChatForm;
