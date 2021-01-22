import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/useWebsocket";
import { useCookie } from "../../../hooks/useCookie";

export const JoinLobbyForm = () => {
  const [lobbyId] = useCookie("lobbyId");
  const [username] = useCookie("username");

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
        <Form>
          <Field type="text" name="id" placeholder="id" required />
          <ErrorMessage name="id" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Join Lobby
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default JoinLobbyForm;
