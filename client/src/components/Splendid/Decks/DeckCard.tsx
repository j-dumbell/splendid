import React from "react";
import { useSelector } from "react-redux";
import { Field, useFormikContext } from "formik";

import { State } from "../../../state/domain";
import { SplendidCard } from "../domain";
import Card from "../Card";
import PurchaseButtons from "./PurchaseButtons";
import { DeckCardContainer } from "./styled";

type Props = {
  card: SplendidCard;
  mini?: boolean;
  reserved?: boolean;
};

const PurchasableCard = ({ card, reserved, mini }: Props) => {
  const { values } = useFormikContext<any>();
  const ref = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <DeckCardContainer>
      <Field type="radio" name="selected" value={ref} />
      <PurchaseButtons
        {...card}
        selectedCard={values.selected === ref}
        reserved={reserved}
      />
      <Card {...card} mini={mini} reserved={reserved} />
    </DeckCardContainer>
  );
};

const DeckCard = ({ reserved, mini, card }: Props) => {
  const { isActivePlayer } = useSelector(({ isActivePlayer }: State) => ({
    isActivePlayer,
  }));
  return isActivePlayer ? (
    <PurchasableCard
      reserved={reserved}
      mini={mini}
      card={card}
    />
  ) : (
    <Card reserved={reserved} mini={mini} {...card} />
  );
};

export default DeckCard;
