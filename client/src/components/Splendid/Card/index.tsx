import React from "react";

import { SplendidSize, SplendidCard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Resource from "../Resource";
import { CardContainer, CardVictoryPoints } from "./styled";
import CardResourceList from "./CardResourceList";

type Props = SplendidCard & {
  size?: SplendidSize;
  reserved?: boolean;
  shadowed?: boolean;
  purchasable?: boolean;
  index?: number;
};

const Card = ({
  id,
  tier,
  points,
  income,
  cost,
  size,
  shadowed,
  reserved,
  purchasable,
  index,
}: Props) => (
  <CardContainer
    column
    justify="space-between"
    tier={tier}
    size={size}
    flipped={shadowed || !id}
    reserved={reserved}
    index={index}
    tabIndex={!purchasable && reserved ? -1 : 0}
  >
    <FlexContainer justify="space-between">
      <CardVictoryPoints size={size}>
        {Boolean(points) && points}
      </CardVictoryPoints>
      {income && (
        <Resource
          resourceType={income}
          size={!size || size === "default" ? "default" : "micro"}
        />
      )}
    </FlexContainer>
    <CardResourceList cost={cost} size={size} reserved={reserved} />
  </CardContainer>
);

export default Card;
