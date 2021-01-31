import React from "react";

import { SplendidCard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Resource from "../Resource";
import ResourceList from "../ResourceList";
import CardContainer from "./styled";
import { sendJSON } from "../../../hooks/useWebsocket";
import styled from "styled-components";

type Props = SplendidCard & {
  mini?: boolean;
  purchasable?: boolean;
};

const CardButton = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  text-align: left;
`;

const CardInner = ({ tier, points, income, cost, mini }: Props) => (
  <CardContainer column justify="space-between" tier={tier} mini={mini}>
    <FlexContainer justify="space-between">
      <div>{Boolean(points) && points}</div>{" "}
      {income && <Resource resourceType={income} mini />}
    </FlexContainer>
    <div>
      {cost && <ResourceList resourceList={cost} hideEmpty mini column />}
    </div>
  </CardContainer>
);

const Card = ({ purchasable, ...props }: Props) => (
  purchasable ? <CardButton
    onClick={() =>
      sendJSON({
        action: "game",
        params: { gameAction: "buyCard", cardId: props.id },
      })
    }
  >
    <CardInner {...props} />
  </CardButton> : <CardInner {...props} />
);

export default Card;
