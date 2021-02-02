import React from "react";
import { Formik, Form, Field, FormikProps } from "formik";

import { splendidResource, SplendidCard } from "../domain";
import { UnstyledButton } from "../../common/Button";
import ResourceCount from "./ResourceCount";
import { sendJSON } from "../../../hooks/useWebsocket";

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
    initialValues={Object.keys(resourceList).reduce(
      (prev, next) => ({ ...prev, [next]: 0 }),
      {}
    )}
    onSubmit={(values, { resetForm, setSubmitting }) => {
      sendJSON({
        action: "game",
        params: { ...values, gameAction: "takeResources" },
      });
      resetForm();
      setSubmitting(false);
    }}
  >
    {({ values, setFieldValue }: FormikProps<any>) => (
      <Form>
        {splendidResource.map((resource, i) => (
          <UnstyledButton
            key={`resource-${i}`}
            type="button"
            id={resource}
            onClick={({ currentTarget: { id } }) =>
              setFieldValue(id, values[id] + 1)
            }
          >
            <Field
              type="hidden"
              name={resource}
              placeholder={resource}
              required
            />
            <ResourceCount resource={resource} count={resourceList[resource]} />
          </UnstyledButton>
        ))}
      </Form>
    )}
  </Formik>
);

export default ResourceList;
