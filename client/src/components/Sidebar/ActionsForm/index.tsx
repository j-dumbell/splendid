import React from "react";

import { useCookie } from "../../../hooks/useCookie";

import FlexContainer from "../../common/FlexContainer";
import NameForm from "./NameForm";
import JoinLobbyForm from "./JoinLobbyForm";
import CreateLobbyForm from "./CreateLobbyForm";
import ExitLobbyButton from "./ExitLobbyButton";
import StartGameButton from "./StartGameButton";

const ActionsForm = () => {
  const [username] = useCookie("username");
  return (
    <FlexContainer column>
      <NameForm />
      {username && (
        <>
          <CreateLobbyForm />
          <JoinLobbyForm />
        </>
      )}
      <ExitLobbyButton />
      <StartGameButton />
    </FlexContainer>
  );
};

export default ActionsForm;
