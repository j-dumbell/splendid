import { useFormikContext } from "formik";
import React from "react";

import Button from "../../common/Button";
import { SplendidCard, SplendidForm } from "../domain";
import { PurchaseContainer } from "./styled";

type PurchaseButtonProps = {
  gameAction: string;
  text: string;
};

const PurchaseButton = ({ gameAction, text }: PurchaseButtonProps) => {
  const { setFieldValue } = useFormikContext<SplendidForm>();
  return (
    <Button onClick={() => setFieldValue("gameAction", gameAction)}>
      {text}
    </Button>
  );
};

type PurchaseButtonsProps = {
  card: SplendidCard;
  reserved?: boolean;
};

const PurchaseButtons = ({ card, reserved }: PurchaseButtonsProps) => (
  <PurchaseContainer>
    {reserved ? (
      <PurchaseButton gameAction="buyCard" text="Buy" />
    ) : card.id ? (
      <>
        <PurchaseButton gameAction="buyCard" text="Buy" />
        <PurchaseButton gameAction="reserveVisible" text="Reserve" />
      </>
    ) : (
      <PurchaseButton gameAction="reserveHidden" text="Reserve" />
    )}
  </PurchaseContainer>
);

export default PurchaseButtons;
