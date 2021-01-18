import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const MessageForm = ({ send }: { send: (message: any) => void }) => (
  <>
    <button onClick={() => send({ action: "create" })}>Create Lobby</button>

    <Formik
      initialValues={{ id: "" }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        send({ action: "join", params: values });
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

    <Formik
      initialValues={{ message: "" }}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        send({ action: "chat", params: values });
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
  </>
);
