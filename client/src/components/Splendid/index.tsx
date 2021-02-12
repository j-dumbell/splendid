import React from "react";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";

import { updateBankResources } from "../../state/actionCreator";
import { sendJSON } from "../../hooks/useWebsocket";
import { useGame } from "../../hooks/useGame";
import { constructEmptyResourceList, constructPayload } from "./helpers";
import Board from "./Board";
import Players from "./Players";

const initialValues = {
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
      <Form style={{ display: "flex", marginLeft: "50px" }}>
        <Board board={game.board} />
        <Players
          players={game.players}
          activePlayerIndex={game.activePlayerIndex}
        />
      </Form>
    </Formik>
  );
};

export default Splendid;
