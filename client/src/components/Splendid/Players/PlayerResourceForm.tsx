import React from "react";
import { useFormikContext } from "formik";

import { useGame } from "../../../hooks/useGame";
import { SplendidPlayer, splendidResource } from "../domain";
import { constructOffsetsPerm, validateMax } from "./helpers";
import FlexContainer from "../../common/FlexContainer";
import ResourceCount from "../ResourceList/ResourceCount";
import PlayerResourceButton from "./PlayerResourceButton";
import { PlayerResourceFormContainer } from './styled';

export const PlayerResourceForm = ({
  bank: playerBank,
  purchased,
}: SplendidPlayer) => {
  const {
    values: { resources },
    setFieldValue,
    submitForm,
  } = useFormikContext<any>();
  const [game] = useGame();
  const {
    board: { bank, bankOffsetTemp },
  } = game!;
  return (
    <PlayerResourceFormContainer color="white">
      {splendidResource.map((resource, i) => (
        <FlexContainer key={i} column justify="space-between">
          <ResourceCount
            resource={resource}
            count={playerBank[resource]}
            offsetTemp={resources[resource]}
            offsetPerm={constructOffsetsPerm(resource, purchased)}
          />
          <div>
            <PlayerResourceButton
              resource={resource}
              nextValueFn={(v) => v - 1}
              disabled={resources[resource] + playerBank[resource] <= 0}
            />
            <PlayerResourceButton
              resource={resource}
              nextValueFn={(v) => v + 1}
              disabled={
                (bankOffsetTemp ? bankOffsetTemp[resource] : 0) +
                  bank[resource] <=
                  0 ||
                !validateMax({
                  ...resources,
                  [resource]: resources[resource] + 1,
                }) ||
                resource === "yellow"
              }
            />
          </div>
        </FlexContainer>
      ))}
      <button
        type="button"
        onClick={() => {
          setFieldValue("gameAction", "takeResources");
          submitForm();
        }}
      >
        Take resources
      </button>
    </PlayerResourceFormContainer>
  );
};

export default PlayerResourceForm;
