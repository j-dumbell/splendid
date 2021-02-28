import React from "react";
import { Field } from "formik";

import Card, { Props as CardProps } from "../Card";
import PurchaseButtons from "./PurchaseButtons";
import { constructCardRef } from "../util";
import { PurchasableCardContainer } from "./styled";

type Props = Omit<CardProps, "index">;

const PurchasableCard = (props: Props) => (
  <PurchasableCardContainer shadowed={props.shadowed}>
    <Field
      type="radio"
      name="selectedCard"
      value={constructCardRef(props.card)}
    />
    <PurchaseButtons card={props.card} reserved={props.reserved} />
    <Card {...props} />
  </PurchasableCardContainer>
);

const DeckCard = (props: Props) =>
  props.purchasable ? <PurchasableCard {...props} /> : <Card {...props} />;

export default DeckCard;
