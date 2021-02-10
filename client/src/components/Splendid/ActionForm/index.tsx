import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../../state/domain";
import CardActionForm from "./CardActionForm";
import FlexContainer from "../../common/FlexContainer";
import { splendidResource } from "../domain";
import ResourceCount from "../ResourceList/ResourceCount";

const ActionForm = () => {
  const game = useSelector(({ game }: State) => game);
  if (!game) {
    return null;
  }
  return (
    <FlexContainer column>
      <FlexContainer>
        {splendidResource.map((resource, i) => (
          <FlexContainer key={i} color="white">
            <ResourceCount
              resource={resource}
              count={game.board.bank[resource]}
              offsetTemp={
                game?.board?.bankOffsetTemp
                  ? game.board.bankOffsetTemp[resource]
                  : undefined
              }
            />
          </FlexContainer>
        ))}
      </FlexContainer>
      <CardActionForm {...game} />
    </FlexContainer>
  );
};

export default ActionForm;
