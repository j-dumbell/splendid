import React from "react";
import { useFormikContext } from "formik";

import { useGame } from "../../../hooks/useGame";
import { SplendidForm, SplendidPlayer, splendidResource } from "../domain";
import { constructOffsetsPerm, validateMax } from "./util";
import FlexContainer from "../../common/FlexContainer";
import { Button } from "../../common/Button";
import ResourceCount from "../ResourceList/ResourceCount";
import PlayerResourceButton from "./PlayerResourceButton";
import { PlayerResourceFormContainer } from "./styled";

export const PlayerResourceForm = ({
  bank: playerBank,
  purchased,
}: SplendidPlayer) => {
  const {
    values: { resources },
    setFieldValue,
    submitForm,
  } = useFormikContext<SplendidForm>();
  const [game] = useGame();
  const {
    board: { bank },
  } = game!;
  return (
    <PlayerResourceFormContainer justify="space-between">
      <FlexContainer>
        {splendidResource.map((resource, i) => (
          <FlexContainer key={i} column justify="space-between">
            <ResourceCount
              resource={resource}
              count={playerBank[resource]}
              offsetTemp={resources[resource]}
              offsetPerm={constructOffsetsPerm(resource, purchased)}
              size="default"
            />
            <FlexContainer justify="center">
              <PlayerResourceButton
                resource={resource}
                nextValueFn={(v) => v - 1}
                disabled={resources[resource] + playerBank[resource] <= 0}
              />
              <PlayerResourceButton
                resource={resource}
                nextValueFn={(v) => v + 1}
                disabled={
                  (-resources[resource] || 0) + bank[resource] <= 0 ||
                  !validateMax({
                    ...resources,
                    [resource]: resources[resource] + 1,
                  }) ||
                  resource === "yellow"
                }
              />
            </FlexContainer>
          </FlexContainer>
        ))}
      </FlexContainer>
      <Button
        type="button"
        onClick={() => {
          setFieldValue("gameAction", "takeResources");
          submitForm();
        }}
      >
        Take Resources
      </Button>
    </PlayerResourceFormContainer>
  );
};

export default PlayerResourceForm;
