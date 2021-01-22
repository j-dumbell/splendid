import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/useWebsocket";
import { useLobbyId } from "../../../hooks/useLobbyId";

export const CreateLobbyForm = () => {
  const [lobbyId] = useLobbyId();
  if (lobbyId) {
    return null;
  }

  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        sendJSON({ action: "create", params: values });
        resetForm();
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="name" placeholder="name" required />
          <ErrorMessage name="name" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Create Lobby
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateLobbyForm;
