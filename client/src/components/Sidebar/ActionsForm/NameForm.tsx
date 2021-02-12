import React from "react";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookie } from "../../../hooks/useCookie";
import { useLobbyId } from "../../../hooks/useLobbyId";

export const NameForm = () => {
  const [lobbyId] = useLobbyId();
  const [username, setUsername, removeUsername] = useCookie("username");
  return username ? (
    <>
      <h3>Welcome back {username}</h3>
      {!lobbyId && <button onClick={removeUsername}>Clear Username</button>}
    </>
  ) : (
    <Formik
      initialValues={{ username: username || "" }}
      onSubmit={({ username }) => setUsername(username)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="username" placeholder="username" required />
          <ErrorMessage name="username" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Set Username
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NameForm;
