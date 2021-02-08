import React from "react";

import { SplendidCard, SplendidPlayer, splendidResource } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import ResourceList from "../ResourceList";

const constructOffsetsPerm = (purchased?: SplendidCard[]) =>
  splendidResource.reduce(
    (prev, next) => ({
      ...prev,
      [next]: purchased?.filter((card) => card.income === next).length,
    }),
    {}
  );

const PlayerResourceList = ({ bank, purchased, bankOffsetTemp }: SplendidPlayer) => {
  return (
    <FlexContainer color="white">
      <ResourceList
        resourceList={bank}
        offsetsPerm={constructOffsetsPerm(purchased)}
        offsetsTemp={bankOffsetTemp}
        hideEmpty
      />
    </FlexContainer>
  );
};

export default PlayerResourceList;
