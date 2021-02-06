import React from "react";

import { SplendidCard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Resource from "../Resource";
import ResourceList from "../ResourceList";
import { CardInnerContainer, PurchaseContainer } from "./styled";
import { sendJSON } from "../../../hooks/useWebsocket";

type Props = SplendidCard & {
  mini?: boolean;
};

const Card = ({ tier, points, income, cost, mini }: Props) => (
  <CardInnerContainer column justify="space-between" tier={tier} mini={mini}>
    <FlexContainer justify="space-between">
      <div>{Boolean(points) && points}</div>{" "}
      {income && <Resource resourceType={income} mini />}
    </FlexContainer>
    <div>
      {cost && <ResourceList resourceList={cost} hideEmpty mini column />}
    </div>
  </CardInnerContainer>
);

export default Card;
