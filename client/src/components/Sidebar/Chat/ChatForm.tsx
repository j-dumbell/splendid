import React from "react";
import { Formik } from "formik";

import { sendJSON } from "../../../hooks/useWebsocket";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { FlexForm, FlexField } from "../../common/FlexContainer";
import { useSelector } from "react-redux";
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
          <button type="submit" disabled={isSubmitting}>
            Send
          </button>
        </FlexForm>
      )}
    </Formik>
  );
};

export default SendChatForm;
