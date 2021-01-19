import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/websocket";

const SendChatForm = () => (
  <Formik
    initialValues={{ message: "" }}
    onSubmit={(values, { resetForm, setSubmitting }) => {
      sendJSON({ action: "chat", params: values });
      resetForm();
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="message" placeholder="message" />
        <ErrorMessage name="message" component="div" />
        <button type="submit" disabled={isSubmitting}>
          Send Message
        </button>
      </Form>
    )}
  </Formik>
);

export default SendChatForm;
