import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../state/domain";
import TakeResourceForm from "./Forms/TakeResourceForm";
import CardActionForm from "./Forms/CardActionForm";
import FlexContainer from "../common/FlexContainer";

const Splendid = () => {
  const game = useSelector(({ game }: State) => game);
  if (!game) {
    return null;
  }
  return (
    <FlexContainer column>
      <FlexContainer>
        <TakeResourceForm resourceList={game.board.bank} />
      </FlexContainer>
      <CardActionForm {...game} />
    </FlexContainer>
  );
};

export default Splendid;
