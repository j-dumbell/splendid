import React from "react";
import { Formik } from "formik";

import { sendJSON } from "../../../hooks/useWebsocket";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { FlexForm, FlexField } from "../../common/FlexContainer";

const SendChatForm = () => {
  const [lobbyId] = useLobbyId();
  if (!lobbyId) {
    return null;
  }
  return (
    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        sendJSON({ action: "chat", params: values });
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
          <button type="submit" disabled={isSubmitting}>
            Send
          </button>
        </FlexForm>
      )}
    </Formik>
  );
};

export default SendChatForm;
