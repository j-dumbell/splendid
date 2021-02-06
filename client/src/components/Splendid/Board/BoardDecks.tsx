import React from "react";
import { Formik, Form } from "formik";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "./DeckCard";

type Props = {
  decks: SplendidBoard["decks"];
};

const constructDeck = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => card.id).concat(decks[tier].slice(-1));

const BoardDecks = ({ decks }: Props) => (
  <Formik onSubmit={() => {}} initialValues={{ selected: undefined }}>
    {({ values }) => (
      <Form>
        {Object.keys(decks)
          .reverse()
          .map((tier, i) => {
            const deckCards = constructDeck(tier, decks);
            return (
              <FlexContainer key={`deck-${i}`}>
                {deckCards.map((card, j) => (
                  <DeckCard
                    key={`cards-${j}`}
                    card={card}
                    selected={values.selected}
                  />
                ))}
              </FlexContainer>
            );
          })}
      </Form>
    )}
  </Formik>
);

export default BoardDecks;
