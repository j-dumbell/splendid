import React from "react";
import { Formik } from "formik";

import Button from "../../common/Button";
import { useCookie } from "../../../hooks/useCookie";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { FlexForm, FlexField } from "../../common/FlexContainer";

export const NameForm = () => {
  const [lobbyId] = useLobbyId();
  const [username, setUsername, removeUsername] = useCookie("username");
  if (lobbyId) {
    return null;
  }
  return !username ? (
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
          <Button big type="submit" disabled={isSubmitting}>
            Set Username
          </Button>
        </FlexForm>
      )}
    </Formik>
  ) : (
    <Button big onClick={removeUsername}>
      Clear Username
    </Button>
  );
};

export default NameForm;
