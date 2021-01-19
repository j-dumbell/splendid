import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/websocket";

export const CreateLobbyForm = () => (
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
        <Field type="text" name="name" placeholder="name" />
        <ErrorMessage name="name" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Create Lobby
        </button>
      </Form>
    )}
  </Formik>
);

export default CreateLobbyForm;
