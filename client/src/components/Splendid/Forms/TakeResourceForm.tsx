import React from "react";
import { useSelector } from "react-redux";
import { Formik, Form, FormikProps, Field } from "formik";

import { splendidResource } from "../domain";
import ResourceCount from "../ResourceList/ResourceCount";
import { sendJSON } from "../../../hooks/useWebsocket";
import FlexContainer from "../../common/FlexContainer";
import { ResourceListProps } from "../ResourceList";
import { validateMax } from "./helpers";
import { State } from "../../../state/domain";

const canBeTaken = (resource: string): boolean => resource !== "yellow";
const constructInitialValues = (resourceList: Record<string, number>) =>
  Object.keys(resourceList).reduce(
    (prev, next) => ({ ...prev, [next]: 0 }),
    {}
  );

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
      {({ values, errors, setFieldValue }: FormikProps<any>) => (
        <Form>
          <FlexContainer color="white">
            {splendidResource.map((resource, i) => (
              <FlexContainer key={i} column justify="space-between">
                <ResourceCount
                  resource={resource}
                  count={resourceList[resource]}
                />
                <div>
                  <button
                    disabled={values[resource] <= 0}
                    type="button"
                    value={resource}
                    onClick={async ({ currentTarget: { value } }) => {
                      setFieldValue(value, values[value] - 1);
                    }}
                  >
                    -
                  </button>
                  <button
                    disabled={
                      Boolean(errors[resource]) || !canBeTaken(resource)
                    }
                    type="button"
                    value={resource}
                    onClick={async ({ currentTarget: { value } }) => {
                      setFieldValue(value, values[value] + 1);
                    }}
                  >
                    +
                  </button>
                  <Field
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    type="text"
                    name={resource}
                    disabled
                    value={values[resource]}
                    id={resource}
                    size={6}
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
