import React from "react";
import { Formik, Field, Form } from "formik";

import { SplendidBoard, SplendidCard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import PurchasableCard from "../Card/PurchasableCard";

type Props = {
  decks: SplendidBoard["decks"];
};

const DeckCard = ({
  card,
  selected,
}: {
  card: SplendidCard;
  selected?: string;
}) => {
  const ref = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <label>
      <Field
        type="radio"
        name="selected"
        value={ref}
        style={{ display: "none" }}
      />
      <PurchasableCard {...card} selectedCard={selected === ref} />
    </label>
  );
};

const BoardDecks = ({ decks }: Props) => (
  <Formik
    onSubmit={() => {}}
    initialValues={{
      selected: undefined,
    }}
  >
    {({ values: { selected } }) => (
      <Form>
        {Object.keys(decks)
          .reverse()
          .map((tier, i) => {
            const deckCards = decks[tier]
              .filter((card) => card.id)
              .concat(decks[tier].slice(-1));
            return (
              <FlexContainer key={`card-container-${i}`}>
                {deckCards.map((card, j) => (
                  <DeckCard key={j} card={card} selected={selected} />
                ))}
              </FlexContainer>
            );
          })}
      </Form>
    )}
  </Formik>
);

export default BoardDecks;
