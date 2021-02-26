import React from "react";
import { Field, useFormikContext } from "formik";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import { SplendidCard, SplendidForm } from "../domain";
import Card from "../Card";
import PurchaseButtons from "./PurchaseButtons";
import { PurchasableCardContainer } from "./styled";

type Props = SplendidCard & {
  mini?: boolean;
  reserved?: boolean;
  shadowed?: boolean;
};

const PurchasableCard = ({ reserved, mini, shadowed, ...card }: Props) => {
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
      <Card {...card} mini={mini} shadowed={shadowed} reserved={reserved} />
    </PurchasableCardContainer>
  );
};

const DeckCard = ({ reserved, mini, shadowed, ...card }: Props) => {
  const [isActivePlayer] = useActivePlayer();
  return isActivePlayer ? (
    <PurchasableCard
      reserved={reserved}
      mini={mini}
      shadowed={shadowed}
      {...card}
    />
  ) : (
    <Card reserved={reserved} mini={mini} shadowed={shadowed} {...card} />
  );
};

export default DeckCard;
