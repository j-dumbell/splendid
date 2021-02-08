import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, FormikProps, useFormikContext } from "formik";

import {
  SplendidResource,
  splendidResource,
  SplendidResourceList,
} from "../domain";
import ResourceCount from "../ResourceList/ResourceCount";
import { sendJSON } from "../../../hooks/useWebsocket";
import FlexContainer from "../../common/FlexContainer";
import { ResourceListProps } from "../ResourceList";
import { validateMax } from "./helpers";
import { State } from "../../../state/domain";
import { updateSplendidPlayerResources } from "../../../state/actionCreator";

const canBeTaken = (resource: string): boolean => resource !== "yellow";
const constructInitialValues = (resourceList: Record<string, number>) =>
  Object.keys(resourceList).reduce(
    (prev, next) => ({ ...prev, [next]: 0 }),
    {}
  );

type ButtonProps = {
  disabled: boolean;
  resource: SplendidResource;
  nextValueFn: (value: number) => number;
};

const Button = ({ disabled, resource, nextValueFn }: ButtonProps) => {
  const dispatch = useDispatch();
  const { values, setValues } = useFormikContext<SplendidResourceList>();
  const currentValue = values[resource];
  const nextValue = nextValueFn(currentValue);
  return (
    <button
      disabled={disabled}
      type="button"
      value={resource}
      onClick={async () => {
        const nextValues = { ...values, [resource]: nextValue };
        setValues(nextValues);
        dispatch(updateSplendidPlayerResources(nextValues));
      }}
    >
      {nextValue < currentValue ? "-" : "+"}
    </button>
  );
};

export const TakeResourceForm = ({ resourceList }: ResourceListProps) => {
  const isActivePlayer = useSelector(
    ({ isActivePlayer }: State) => isActivePlayer
  );

  return isActivePlayer ? (
    <Formik
      validate={validateMax}
      initialValues={constructInitialValues(resourceList)}
      onSubmit={(values, { resetForm }) => {
        sendJSON({
          action: "game",
          params: { ...values, gameAction: "takeResources" },
        });
        resetForm();
      }}
    >
      {({ values, errors }: FormikProps<any>) => (
        <Form>
          <FlexContainer color="white">
            {splendidResource.map((resource, i) => (
              <FlexContainer key={i} column justify="space-between">
                <ResourceCount
                  resource={resource}
                  count={resourceList[resource]}
                  offsetTemp={-values[resource]}
                />
                <div>
                  <Button
                    resource={resource}
                    nextValueFn={(v) => v - 1}
                    disabled={values[resource] <= 0}
                  />
                  <Button
                    resource={resource}
                    nextValueFn={(v) => v + 1}
                    disabled={
                      Boolean(errors[resource]) ||
                      values[resource] >= resourceList[resource] ||
                      !canBeTaken(resource)
                    }
                  />
                </div>
              </FlexContainer>
            ))}
            <button
              type="submit"
              disabled={Object.values(errors).some(Boolean)}
            >
              Take resources
            </button>
          </FlexContainer>
        </Form>
      )}
    </Formik>
  ) : (
    <>
      {splendidResource.map((resource, i) => (
        <FlexContainer key={i} color="white">
          <ResourceCount resource={resource} count={resourceList[resource]} />
        </FlexContainer>
      ))}
    </>
  );
};

export default TakeResourceForm;
