import React from "react";
import { Formik } from "formik";

import Button from "../../common/Button";
import Text from "../../common/Text";
import { useCookie } from "../../../hooks/useCookie";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { FlexForm, FlexField } from "../../common/FlexContainer";

const Lobby = ({ lobbyId }: { lobbyId?: string }) => {
  if (!lobbyId) {
    return null;
  }
  return (
    <>
      <br />
      Lobby
      <Text color="#FF917B"> {lobbyId}</Text>
    </>
  );
};

export const NameForm = () => {
  const [lobbyId] = useLobbyId();
  const [username, setUsername, removeUsername] = useCookie("username");
  return username ? (
    <>
      <h3>
        Welcome back <Text color="#ac81fe">{username}</Text><Lobby lobbyId={lobbyId} />
      </h3>
      {!lobbyId && <Button onClick={removeUsername}>Clear Username</Button>}
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
          <Button type="submit" disabled={isSubmitting}>
            Set Username
          </Button>
        </FlexForm>
      )}
    </Formik>
  );
};

export default NameForm;
