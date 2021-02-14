import React from "react";
import { Formik } from "formik";
import { useDispatch } from "react-redux";

import { updateBankResources } from "../../state/actionCreator";
import { sendJSON } from "../../hooks/useWebsocket";
import { useGame } from "../../hooks/useGame";
import { constructEmptyResourceList, constructPayload } from "./helpers";
import Board from "./Board";
import Players from "./Players";
import { SplendidForm } from "./domain";
import { SplendidContainer, SplendidFormContainer } from "./styled";

const initialValues: SplendidForm = {
  cardId: "",
  gameAction: "",
  selectedCard: "",
  resources: constructEmptyResourceList(),
};

const Splendid = () => {
  const dispatch = useDispatch();
  const [game] = useGame();
  if (!game) {
    return <SplendidContainer />;
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        sendJSON(constructPayload(values));
        dispatch(updateBankResources(initialValues.resources));
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
