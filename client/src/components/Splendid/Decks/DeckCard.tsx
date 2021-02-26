import React from "react";
import { Field, useFormikContext } from "formik";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import { CardSize, SplendidCard, SplendidForm } from "../domain";
import Card from "../Card";
import PurchaseButtons from "./PurchaseButtons";
import { PurchasableCardContainer } from "./styled";

type Props = SplendidCard & {
  size?: CardSize;
  reserved?: boolean;
  shadowed?: boolean;
};

const PurchasableCard = ({ reserved, size, shadowed, ...card }: Props) => {
  const {
    values: { selectedCard },
  } = useFormikContext<SplendidForm>();
  const cardRef = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <PurchasableCardContainer>
      <Field type="radio" name="selectedCard" value={cardRef} />
      <PurchaseButtons
        {...card}
        selected={selectedCard === cardRef}
        reserved={reserved}
      />
      <Card {...card} size={size} shadowed={shadowed} reserved={reserved} />
    </PurchasableCardContainer>
  );
};

const DeckCard = ({ reserved, size, shadowed, ...card }: Props) => {
  const [isActivePlayer] = useActivePlayer();
  return isActivePlayer ? (
    <PurchasableCard
      reserved={reserved}
      size={size}
      shadowed={shadowed}
      {...card}
    />
  ) : (
    <Card reserved={reserved} size={size} shadowed={shadowed} {...card} />
  );
};

export default DeckCard;
