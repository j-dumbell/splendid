import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/websocket";

export const JoinLobbyForm = () => (
  <Formik
    initialValues={{ id: "", name: "" }}
    onSubmit={(values, { resetForm, setSubmitting }) => {
      sendJSON({ action: "join", params: values });
      resetForm();
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="name" placeholder="name" required />
        <ErrorMessage name="name" component="div" />
        <Field type="text" name="id" placeholder="id" required />
        <ErrorMessage name="id" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Join Lobby
        </button>
      </Form>
    )}
  </Formik>
);

export default JoinLobbyForm;
