import React from "react";

import { SplendidSize, SplendidCard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Resource from "../Resource";
import { CardContainer, CardVictoryPoints } from "./styled";
import CardResourceList from "./CardResourceList";

export type Props = {
  card: SplendidCard;
  size?: SplendidSize;
  reserved?: boolean;
  shadowed?: boolean;
  purchasable?: boolean;
  index?: number;
};

const Card = ({
  card,
  size,
  shadowed,
  reserved,
  purchasable,
  index,
}: Props) => (
  <CardContainer
    column
    justify="space-between"
    tier={card.tier}
    size={size}
    flipped={shadowed || !card.id}
    reserved={reserved}
    index={index}
    tabIndex={!purchasable && reserved ? -1 : 0}
  >
    <FlexContainer justify="space-between">
      <CardVictoryPoints size={size}>
        {Boolean(card.points) && card.points}
      </CardVictoryPoints>
      {card.income && (
        <Resource
          resourceType={card.income}
          size={!size || size === "default" ? "default" : "micro"}
        />
      )}
    </FlexContainer>
    <CardResourceList cost={card.cost} size={size} reserved={reserved} />
  </CardContainer>
);

export default Card;
