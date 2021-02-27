import React from "react";
import { Field } from "formik";

import { SplendidSize, SplendidCard } from "../domain";
import Card from "../Card";
import PurchaseButtons from "./PurchaseButtons";
import { PurchasableCardContainer } from "./styled";

type Props = SplendidCard & {
  purchasable?: boolean;
  size?: SplendidSize;
  reserved?: boolean;
  shadowed?: boolean;
};

const PurchasableCard = ({ reserved, size, shadowed, purchasable, ...card }: Props) => {
  const cardRef = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <PurchasableCardContainer shadowed={shadowed}>
      <Field type="radio" name="selectedCard" value={cardRef} />
      <PurchaseButtons
        {...card}
        reserved={reserved}
      />
      <Card {...card} size={size} shadowed={shadowed} reserved={reserved} purchasable={purchasable} />
    </PurchasableCardContainer>
  );
};

const DeckCard = ({ reserved, size, shadowed, purchasable, ...card }: Props) => {
  return purchasable ? (
    <PurchasableCard
      reserved={reserved}
      size={size}
      shadowed={shadowed}
      {...card}
      purchasable={purchasable}
    />
  ) : (
    <Card reserved={reserved} size={size} shadowed={shadowed} purchasable={purchasable} {...card} />
  );
};

export default DeckCard;
