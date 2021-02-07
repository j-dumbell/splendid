import React from "react";
import { Field } from "formik";

import { DeckCardContainer } from "./styled";
import { SplendidCard } from "../domain";
import Card from "../Card";
import PurchaseButtons from "./PurchaseButtons";

type Props = {
  card: SplendidCard;
  selected?: string;
  mini?: boolean;
  reserved?: boolean;
};

const DeckCard = ({ card, selected, reserved, mini }: Props) => {
  const ref = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <DeckCardContainer>
      <Field type="radio" name="selected" value={ref} />
      <PurchaseButtons {...card} selectedCard={selected === ref} reserved={reserved} />
      <Card {...card} mini={mini} reserved={reserved} />
    </DeckCardContainer>
  );
};

export default DeckCard;
