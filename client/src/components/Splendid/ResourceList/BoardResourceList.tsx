import React from "react";
import { Formik, Form, FormikProps, Field } from "formik";

import { splendidResource } from "../domain";
import ResourceCount from "./ResourceCount";
import { sendJSON } from "../../../hooks/useWebsocket";
import FlexContainer from "../../common/FlexContainer";
import { validateMax } from "./helpers";
import { ResourceListProps } from ".";

export const BoardResourceList = ({ resourceList }: ResourceListProps) => (
  <Formik
    validate={validateMax}
    initialValues={Object.keys(resourceList).reduce(
      (prev, next) => ({ ...prev, [next]: 0 }),
      {}
    )}
    onSubmit={(values) =>
      sendJSON({
        action: "game",
        params: { ...values, gameAction: "takeResources" },
      })
    }
  >
    {({ values, errors, setFieldValue }: FormikProps<any>) => (
      <Form>
        {splendidResource.map((resource, i) => (
          <FlexContainer key={i}>
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
                disabled={Boolean(errors[resource])}
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
            <ResourceCount resource={resource} count={resourceList[resource]} />
          </FlexContainer>
        ))}
        <button type="submit" disabled={Object.values(errors).some(Boolean)}>
          Buy resources
        </button>
      </Form>
    )}
  </Formik>
);

export default BoardResourceList;
