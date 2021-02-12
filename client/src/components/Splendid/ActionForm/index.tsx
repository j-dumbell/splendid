import { Formik, Form } from "formik";
import React from "react";

import {
  SplendidGame,
  splendidResource,
  SplendidResourceList,
} from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Elite from "../Elite";
import Decks from "../Decks";
import Players from "../Players";
import { useDispatch } from "react-redux";
import { updateBankResources } from "../../../state/actionCreator";
import { sendJSON } from "../../../hooks/useWebsocket";

export const constructInitialResources = (): SplendidResourceList =>
  splendidResource.reduce((prev, next) => {
    return { ...prev, [next]: 0 };
  }, {}) as SplendidResourceList;

const CardActionForm = ({
  board,
  players,
  activePlayerIndex,
}: SplendidGame) => {
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        cardId: "",
        gameAction: "",
        selectedCard: "",
        resources: constructInitialResources(),
      }}
      onSubmit={(values, { resetForm }) => {
        const cardId = values.selectedCard.startsWith("visible")
          ? Number(values.selectedCard.replace("visible-", ""))
          : undefined;
        const tier = values.selectedCard.startsWith("hidden")
          ? Number(values.selectedCard.replace("hidden-", ""))
          : undefined;
        sendJSON({
          action: "game",
          params: {
            gameAction: values.gameAction,
            resources: values.resources,
            cardId,
            tier,
          },
        });
        dispatch(updateBankResources(constructInitialResources()))
        resetForm();
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
};

export default CardActionForm;
