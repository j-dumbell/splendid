import React from "react";

import { Formik } from "formik";
import { useCookie } from "../../../hooks/useCookie";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { FlexForm, FlexField } from "../../common/FlexContainer";

export const NameForm = () => {
  const [lobbyId] = useLobbyId();
  const [username, setUsername, removeUsername] = useCookie("username");
  return username ? (
    <>
      <h3>Welcome back {username}</h3>
      {lobbyId ? (
        <h3>Lobby {lobbyId}</h3>
      ) : (
        <button onClick={removeUsername}>Clear Username</button>
      )}
    </>
  ) : (
    <Formik
      initialValues={{ username: username || "" }}
      onSubmit={({ username }) => setUsername(username)}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <FlexField
            type="text"
            name="username"
            placeholder="username"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            Set Username
          </button>
        </FlexForm>
      )}
    </Formik>
  );
};

export default NameForm;
