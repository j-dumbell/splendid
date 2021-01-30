import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { sendJSON } from "../../hooks/useWebsocket";
import { State } from "../../state/domain";

const SendChatForm = () => {
  const lobbyId = useSelector((state: State) => state.lobbyId);
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
        <Form>
          <Field type="text" name="message" placeholder="message" required />
          <ErrorMessage name="message" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Send Message
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SendChatForm;
