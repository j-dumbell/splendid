import React from "react";
import { Formik, Form, FormikProps, Field } from "formik";

import { splendidResource, SplendidCard } from "../domain";
import ResourceCount from "./ResourceCount";
import { sendJSON } from "../../../hooks/useWebsocket";
import FlexContainer from "../../common/FlexContainer";
import { validateMax } from "./helpers";

type Props = {
  resourceList: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
  column?: boolean;
  purchased?: SplendidCard[];
};

const ResourceList = ({ resourceList, hideEmpty, mini, column }: Props) => (
  <>
    {splendidResource.map((resource, i) => {
      if ((resourceList[resource] ?? 0) <= 0 && hideEmpty) {
        return null;
      }
      return (
        <ResourceCount
          key={`resource-${i}`}
          resource={resource}
          count={resourceList[resource]}
          mini={mini}
          column={column}
        />
      );
    })}
  </>
);

export const PlayerResourceList = ({
  resourceList,
  hideEmpty,
  purchased,
}: Props) => (
  <>
    {splendidResource.map((resource, i) => {
      const purchasedCount =
        purchased?.filter((card) => card.income === resource).length ?? 0;
      const totals = (resourceList[resource] ?? 0) + purchasedCount;
      if (totals <= 0 && hideEmpty) {
        return null;
      }
      return (
        <ResourceCount
          key={`resource-${i}`}
          resource={resource}
          count={resourceList[resource]}
          purchasedCount={purchasedCount}
        />
      );
    })}
  </>
);

export const BoardResourceList = ({ resourceList }: Props) => (
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
            <>
              <Field
                type="text"
                name={resource}
                disabled
                value={values[resource]}
                id={resource}
              />
              <button
                disabled={Boolean(errors[resource])}
                style={{ marginRight: "5px" }}
                type="button"
                value={resource}
                onClick={async ({ currentTarget: { value } }) => {
                  setFieldValue(value, values[value] + 1);
                }}
              >
                +
              </button>
              <button
                disabled={values[resource] <= 0}
                style={{ marginRight: "5px" }}
                type="button"
                value={resource}
                onClick={async ({ currentTarget: { value } }) => {
                  setFieldValue(value, values[value] - 1);
                }}
              >
                -
              </button>
            </>
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

export default ResourceList;
