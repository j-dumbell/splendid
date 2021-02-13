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
import { SplendidContainer } from './styled';

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
    return null;
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
      <SplendidContainer>
        <Board board={game.board} />
        <Players
          players={game.players}
          activePlayerIndex={game.activePlayerIndex}
        />
      </SplendidContainer>
    </Formik>
  );
};

export default Splendid;
