import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export const MessageForm = ({ send }: { send: (message: any) => void }) => (
  <Formik
    initialValues={{ message: "" }}
    onSubmit={(values, { resetForm, setSubmitting }) => {
      send(values);
      resetForm();
      setSubmitting(false);
    }}
  >
    {({ isSubmitting }) => (
      <Form>
        <Field type="text" name="message" placeholder="message" />
        <ErrorMessage name="message" component="div" />
        <button type="submit" disabled={isSubmitting}>
          send
        </button>
      </Form>
    )}
  </Formik>
);
