import React from "react";
import { Formik } from "formik";

import Button from "../../common/Button";
import { sendJSON } from "../../../hooks/useWebsocket";
import { useCookie } from "../../../hooks/useCookie";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { FlexForm, FlexField } from "../../common/FlexContainer";

export const JoinLobbyForm = () => {
  const [username] = useCookie("username");
  const [lobbyId] = useLobbyId();
  if (lobbyId) {
    return null;
  }
  return (
    <Formik
      initialValues={{ id: "" }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        sendJSON({ action: "join", params: { ...values, name: username } });
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <FlexField type="text" name="id" placeholder="id" required />
          <Button big type="submit" disabled={isSubmitting}>
            Join Lobby
          </Button>
        </FlexForm>
      )}
    </Formik>
  );
};

export default JoinLobbyForm;
