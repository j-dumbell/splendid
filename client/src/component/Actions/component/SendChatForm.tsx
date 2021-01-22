import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { sendJSON } from "../../../hooks/useWebsocket";
import { useCookie } from "../../../hooks/useCookie";

const SendChatForm = () => {
  const [lobbyId] = useCookie("lobbyId");
  
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
