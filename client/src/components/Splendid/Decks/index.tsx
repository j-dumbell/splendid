import React from "react";
import { Formik, Form } from "formik";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "./DeckCard";

type Props = {
  decks: SplendidBoard["decks"];
};

const getDeckKeys = (decks: SplendidBoard["decks"]) =>
  Object.keys(decks).reverse();
  
const constructDeck = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => card.id).concat(decks[tier].slice(-1));

const Decks = ({ decks }: Props) => (
  <Formik onSubmit={() => {}} initialValues={{ selected: undefined }}>
    {({ values }) => (
      <Form>
        {getDeckKeys(decks).map((tier, i) => (
          <FlexContainer key={`deck-${i}`}>
            {constructDeck(tier, decks).map((card, j) => (
              <DeckCard
                key={`cards-${j}`}
                card={card}
                selected={values.selected}
              />
            ))}
          </FlexContainer>
        ))}
      </Form>
    )}
  </Formik>
);

export default Decks;
