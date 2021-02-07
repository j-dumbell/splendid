import React from "react";

import { sendJSON } from "../../../hooks/useWebsocket";
import { SplendidCard } from "../domain";
import { PurchaseContainer } from "./styled";

type PurchaseButtonProps = {
  gameAction: string;
  text: string;
  params: Record<string, unknown>;
};

const PurchaseButton = ({ gameAction, text, params }: PurchaseButtonProps) => (
  <button
    onClick={() =>
      sendJSON({
        action: "game",
        params: { gameAction, ...params },
      })
    }
  >
    {text}
  </button>
);

type PurchaseButtonsProps = SplendidCard & {
  selectedCard: boolean;
  reserved?: boolean;
};

const PurchaseButtons = (props: PurchaseButtonsProps) => (
  <PurchaseContainer selectedCard={props.selectedCard}>
    {props.reserved ? (
      <PurchaseButton
        gameAction="buyCard"
        text="Buy"
        params={{ cardId: props.id }}
      />
    ) : props.id ? (
      <>
        <PurchaseButton
          gameAction="buyCard"
          text="Buy"
          params={{ cardId: props.id }}
        />
        <PurchaseButton
          gameAction="reserveVisible"
          text="Reserve"
          params={{ cardId: props.id }}
        />
      </>
    ) : (
      <PurchaseButton
        gameAction="reserveHidden"
        text="Reserve"
        params={{ tier: props.tier }}
      />
    )}
  </PurchaseContainer>
);

export default PurchaseButtons;
