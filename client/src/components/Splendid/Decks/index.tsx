import React from "react";
import { Formik, Form } from "formik";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "./DeckCard";
import { DeckStack, StackCount } from "./styled";

type Props = {
  decks: SplendidBoard["decks"];
};

const getDeckKeys = (decks: SplendidBoard["decks"]) =>
  Object.keys(decks).reverse();

const constructVisible = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => card.id);

const constructDeck = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => !card.id);

const Decks = ({ decks }: Props) => (
  <Formik onSubmit={() => {}} initialValues={{ selected: undefined }}>
    {({ values }) => (
      <Form>
        {getDeckKeys(decks).map((tier, i) => (
          <FlexContainer key={`deck-${i}`}>
            {constructVisible(tier, decks).map((card, j) => (
              <DeckCard
                key={`cards-${j}`}
                card={card}
                selected={values.selected}
              />
            ))}
            <DeckStack>
              <StackCount>{constructDeck(tier, decks).length}</StackCount>
              <DeckCard
                card={{ tier: Number(tier) }}
                selected={values.selected}
              />
            </DeckStack>
          </FlexContainer>
        ))}
      </Form>
    )}
  </Formik>
);

export default Decks;
