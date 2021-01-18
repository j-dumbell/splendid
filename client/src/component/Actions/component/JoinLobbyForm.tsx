import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/websocket";

export const JoinLobbyForm = () => (
  <Formik
    initialValues={{ id: "" }}
    onSubmit={(values, { resetForm, setSubmitting }) => {
      sendJSON({ action: "join", params: values });
      resetForm();
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="id" placeholder="id" />
        <ErrorMessage name="id" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Join Lobby
        </button>
      </Form>
    )}
  </Formik>
);

export default JoinLobbyForm;
