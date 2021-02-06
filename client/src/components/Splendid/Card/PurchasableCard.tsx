import React from "react";

import { SplendidCard } from "../domain";
import { PurchaseContainer } from "./styled";
import { sendJSON } from "../../../hooks/useWebsocket";
import Card from ".";

type Props = SplendidCard & {
  mini?: boolean;
  selectedCard: boolean;
};

const PurchaseButton = ({
  gameAction,
  text,
  params,
}: {
  gameAction: string;
  text: string;
  params: Record<string, unknown>;
}) => (
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

const PurchasableCard = ({ selectedCard, ...props }: Props) => (
  <div style={{ position: "relative" }}>
    <PurchaseContainer selectedCard={selectedCard}>
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
    <Card {...props} />
  </div>
);

export default PurchasableCard;
