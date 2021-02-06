import React from "react";
import { Field } from "formik";

import { DeckCardOuter, DeckCardInner } from "./styled";
import { SplendidCard } from "../domain";
import Card from "../Card";
import { sendJSON } from "../../../hooks/useWebsocket";

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

type DeckCardProps = {
  card: SplendidCard;
  selected?: string;
};

const DeckCard = ({ card, selected }: DeckCardProps) => {
  const ref = card.id ? `visible-${card.id}` : `hidden-${card.tier}`;
  return (
    <DeckCardOuter>
      <Field
        type="radio"
        name="selected"
        value={ref}
        style={{ display: "none" }}
      />
      <DeckCardInner selectedCard={selected === ref}>
        {card.id ? (
          <>
            <PurchaseButton
              gameAction="buyCard"
              text="Buy"
              params={{ cardId: card.id }}
            />
            <PurchaseButton
              gameAction="reserveCard"
              text="Reserve"
              params={{ cardId: card.id }}
            />
          </>
        ) : (
          <PurchaseButton
            gameAction="reserveHidden"
            text="Reserve"
            params={{ tier: card.tier }}
          />
        )}
      </DeckCardInner>
      <Card {...card} />
    </DeckCardOuter>
  );
};

export default DeckCard;
