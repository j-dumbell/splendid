import React from "react";

import { useCookie } from "../../../hooks/useCookie";

import NameForm from "./NameForm";
import JoinLobbyForm from "./JoinLobbyForm";
import CreateLobbyForm from "./CreateLobbyForm";
import ExitLobbyButton from "./ExitLobbyButton";
import StartGameButton from "./StartGameButton";
import { ActionsFormContainer } from './styled';

const ActionsForm = () => {
  const [username] = useCookie("username");
  return (
    <ActionsFormContainer column>
      <NameForm />
      {username && (
        <>
          <CreateLobbyForm />
          <JoinLobbyForm />
        </>
      )}
      <ExitLobbyButton />
      <StartGameButton />
    </ActionsFormContainer>
  );
};

export default ActionsForm;
