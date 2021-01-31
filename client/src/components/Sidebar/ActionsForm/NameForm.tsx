import React from "react";
import { useSelector } from "react-redux";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCookie } from "../../../hooks/useCookie";
import { State } from "../../../state/domain";

export const NameForm = () => {
  const lobbyId = useSelector(({ lobbyId }: State) => lobbyId);
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
