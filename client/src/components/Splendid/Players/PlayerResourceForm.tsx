import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormikContext } from "formik";

import { useActivePlayer } from "../../../hooks/useActivePlayer";
import {
  SplendidCard,
  SplendidPlayer,
  SplendidResource,
  splendidResource,
} from "../domain";
import ResourceCount from "../ResourceList/ResourceCount";
import FlexContainer from "../../common/FlexContainer";
import { updateBankResources } from "../../../state/actionCreator";
import { State } from "../../../state/domain";

type ButtonProps = {
  disabled: boolean;
  resource: SplendidResource;
  nextValueFn: (value: number) => number;
};

const constructOffsetsPerm = (
  resource: SplendidResource,
  purchased?: SplendidCard[]
) => purchased?.filter((card) => card.income === resource).length || 0;

const Button = ({ disabled, resource, nextValueFn }: ButtonProps) => {
  const dispatch = useDispatch();
  const { values, setValues } = useFormikContext<any>();
  const currentValue = values.resources[resource];
  const nextValue = nextValueFn(currentValue);
  return (
    <button
      disabled={disabled}
      type="button"
      value={resource}
      onClick={async () => {
        setValues({
          ...values,
          resources: {
            ...values.resources,
            [resource]: nextValue,
          },
        });
        dispatch(
          updateBankResources({
            ...values.resources,
            [resource]: -nextValue,
          })
        );
      }}
    >
      {nextValue < currentValue ? "-" : "+"}
    </button>
  );
};

export const PlayerResourceForm = ({
  id,
  bank: playerBank,
  purchased,
}: SplendidPlayer) => {
  const { bank, bankOffsetTemp } = useSelector(
    ({ game }: State) => game!.board
  );
  const { values, setFieldValue, submitForm } = useFormikContext<any>();
  const [isActivePlayer, clientId] = useActivePlayer();
  return isActivePlayer && clientId === id ? (
    <FlexContainer color="white">
      {splendidResource.map((resource, i) => (
        <FlexContainer key={i} column justify="space-between">
          <ResourceCount
            resource={resource}
            count={playerBank[resource]}
            offsetTemp={values.resources[resource]}
            offsetPerm={constructOffsetsPerm(resource, purchased)}
          />
          <div>
            <Button
              resource={resource}
              nextValueFn={(v) => v - 1}
              disabled={values.resources[resource] + playerBank[resource] <= 0}
            />
            <Button
              resource={resource}
              nextValueFn={(v) => v + 1}
              disabled={
                (bankOffsetTemp ? bankOffsetTemp[resource] : 0) +
                  bank[resource] <=
                0
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
    </FlexContainer>
  ) : (
    <FlexContainer>
      {splendidResource.map((resource, i) => (
        <FlexContainer key={i} color="white">
          <ResourceCount
            resource={resource}
            count={playerBank[resource]}
            offsetPerm={constructOffsetsPerm(resource, purchased)}
          />
        </FlexContainer>
      ))}
    </FlexContainer>
  );
};

export default PlayerResourceForm;
