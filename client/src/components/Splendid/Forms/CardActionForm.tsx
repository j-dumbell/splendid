import { Formik, Form } from "formik";
import React from "react";

import { sendJSON } from "../../../hooks/useWebsocket";
import FlexContainer from "../../common/FlexContainer";
import Decks from "../Decks";
import { SplendidGame } from "../domain";
import Elite from "../Elite";
import Players from "../Players";

const CardActionForm = ({
  board,
  players,
  activePlayerIndex,
}: SplendidGame) => (
  <Formik
    initialValues={{ gameAction: "" }}
    onSubmit={(values, { resetForm, setSubmitting }) => {
      sendJSON({ action: "game", params: { ...values } });
      resetForm();
      setSubmitting(false);
    }}
  >
    <Form style={{ display: "flex" }}>
      <FlexContainer column>
        <FlexContainer>
          {board.elites
            .filter((card) => card.id)
            .map((elite, i) => (
              <Elite key={`elite-${i}`} {...elite} />
            ))}
        </FlexContainer>
        <Decks decks={board.decks} />
      </FlexContainer>
      <Players activePlayerIndex={activePlayerIndex} players={players} />
    </Form>
  </Formik>
);

export default CardActionForm;
