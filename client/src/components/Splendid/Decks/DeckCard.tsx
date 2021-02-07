import React from "react";
import { Field } from "formik";

import { DeckCardContainer } from "./styled";
import { SplendidCard } from "../domain";
import Card from "../Card";
import PurchaseButtons from "./PurchaseButtons";

type Props = {
  card: SplendidCard;
  selected?: string;
};

const DeckCard = ({ card, selected }: Props) => {
  const ref = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <DeckCardContainer>
      <Field type="radio" name="selected" value={ref} />
      <PurchaseButtons {...card} selectedCard={selected === ref} />
      <Card {...card} />
    </DeckCardContainer>
  );
};

export default DeckCard;
