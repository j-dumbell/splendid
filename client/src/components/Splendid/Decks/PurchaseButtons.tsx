import React from "react";

import { sendJSON } from "../../../hooks/useWebsocket";
import { SplendidCard } from "../domain";
import { PurchaseContainer } from "./styled";

type Props = {
  gameAction: string;
  text: string;
  params: Record<string, unknown>;
};

const PurchaseButton = ({ gameAction, text, params }: Props) => (
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

const PurchaseButtons = (props: SplendidCard & { selectedCard: boolean }) => (
  <PurchaseContainer selectedCard={props.selectedCard}>
    {props.id ? (
      <>
        <PurchaseButton
          gameAction="buyCard"
          text="Buy"
          params={{ cardId: props.id }}
        />
        <PurchaseButton
          gameAction="reserveCard"
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
