import React from "react";
import { Formik } from "formik";

import { sendJSON } from "../../hooks/useWebsocket";
import { useGame } from "../../hooks/useGame";
import { constructEmptyResourceList, constructPayload } from "./util";
import Board from "./Board";
import Players from "./Players";
import { SplendidForm } from "./domain";
import { SplendidContainer, SplendidFormContainer } from "./styled";

const initialValues: SplendidForm = {
  selectedCard: "",
  resources: constructEmptyResourceList(),
};

const Splendid = () => {
  const [,game] = useGame();
  if (!game) {
    return <SplendidContainer />;
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        sendJSON(constructPayload(values));
        resetForm();
      }}
    >
      <SplendidFormContainer>
        <Board board={game.board} />
        <Players players={game.players} />
      </SplendidFormContainer>
    </Formik>
  );
};

export default Splendid;
