import React from "react";
import { useFormikContext } from "formik";

import { SplendidForm, SplendidResource } from "../domain";
import Button from "../../common/Button";

type Props = {
  disabled: boolean;
  resource: SplendidResource;
  nextValueFn: (value: number) => number;
};

const PlayerResourceButton = ({ disabled, resource, nextValueFn }: Props) => {
  const {
    values: { resources },
    setFieldValue,
  } = useFormikContext<SplendidForm>();
  const currentValue = resources[resource];
  const nextValue = nextValueFn(currentValue);
  return (
    <Button
      disabled={disabled}
      type="button"
      onClick={() => {
        setFieldValue("resources", {
          ...resources,
          [resource]: nextValue,
        });
      }}
    >
      {nextValue < currentValue ? "-" : "+"}
    </Button>
  );
};

export default PlayerResourceButton;
