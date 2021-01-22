import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/useWebsocket";
import { useCookie } from "../../../hooks/useCookie";

export const CreateLobbyForm = () => {
  const [lobbyId] = useCookie("lobbyId");
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
