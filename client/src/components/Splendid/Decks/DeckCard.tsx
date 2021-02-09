import React from "react";
import { Field, useFormikContext } from "formik";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import { SplendidCard } from "../domain";
import Card from "../Card";
import PurchaseButtons from "./PurchaseButtons";
import { DeckCardContainer } from "./styled";

type Props = SplendidCard & {
  mini?: boolean;
  reserved?: boolean;
};

const PurchasableCard = ({ reserved, mini, ...card }: Props) => {
  const { values } = useFormikContext<any>();
  const cardRef = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <DeckCardContainer>
      <Field type="radio" name="selectedCard" value={cardRef} />
      <PurchaseButtons
        {...card}
        selected={values.selectedCard === cardRef}
        reserved={reserved}
      />
      <Card {...card} mini={mini} reserved={reserved} />
    </DeckCardContainer>
  );
};

const DeckCard = ({ reserved, mini, ...card }: Props) => {
  const [isActivePlayer] = useActivePlayer();
  return isActivePlayer ? (
    <PurchasableCard
      reserved={reserved}
      mini={mini}
      {...card}
    />
  ) : (
    <Card reserved={reserved} mini={mini} {...card} />
  );
};

export default DeckCard;
