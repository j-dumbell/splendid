import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../state/domain";
import FlexContainer from "../common/FlexContainer";
import ActionForm from "./ActionForm";
import { splendidResource } from "./domain";
import ResourceCount from "./ResourceList/ResourceCount";

const Splendid = () => {
  const game = useSelector(({ game }: State) => game);
  if (!game) {
    return null;
  }
  return (
    <FlexContainer style={{ marginLeft: "50px" }}>
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
        <ActionForm {...game} />
      </FlexContainer>
    </FlexContainer>
  );
};

export default Splendid;
