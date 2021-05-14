import React from "react";
import { Formik } from "formik";

import { sendJSON } from "../../../hooks/useWebsocket";
import { useLobbyId } from "../../../hooks/useLobbyId";
import Button from "../../common/Button";
import { FlexForm, FlexField } from "../../common/FlexContainer";
import { useClientId } from "../../../hooks/useClientId";

const SendChatForm = () => {
  const [lobbyId] = useLobbyId();
  const [clientId] = useClientId();
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
