import { useFormikContext } from "formik";
import React from "react";

import { SplendidCard, SplendidForm } from "../domain";
import { PurchaseContainer } from "./styled";

type PurchaseButtonProps = {
  gameAction: string;
  text: string;
};

const PurchaseButton = ({ gameAction, text }: PurchaseButtonProps) => {
  const { setFieldValue } = useFormikContext<SplendidForm>();
  return (
    <button onClick={() => setFieldValue("gameAction", gameAction)}>
      {text}
    </button>
  );
};

type PurchaseButtonsProps = SplendidCard & {
  selected: boolean;
  reserved?: boolean;
};

const PurchaseButtons = (props: PurchaseButtonsProps) => (
  <PurchaseContainer selected={props.selected}>
    {props.reserved ? (
      <PurchaseButton gameAction="buyCard" text="Buy" />
    ) : props.id ? (
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
