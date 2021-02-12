import React from "react";
import { useDispatch } from "react-redux";
import { useFormikContext } from "formik";

import { SplendidForm, SplendidResource } from "../domain";
import { updateBankResources } from "../../../state/actionCreator";

type Props = {
  disabled: boolean;
  resource: SplendidResource;
  nextValueFn: (value: number) => number;
};

const PlayerResourceButton = ({ disabled, resource, nextValueFn }: Props) => {
  const dispatch = useDispatch();
  const {
    values: { resources },
    setFieldValue,
  } = useFormikContext<SplendidForm>();
  const currentValue = resources[resource];
  const nextValue = nextValueFn(currentValue);
  return (
    <button
      disabled={disabled}
      type="button"
      onClick={() => {
        dispatch(updateBankResources({ [resource]: -nextValue }));
        setFieldValue("resources", {
          ...resources,
          [resource]: nextValue,
        });
      }}
    >
      {nextValue < currentValue ? "-" : "+"}
    </button>
  );
};

export default PlayerResourceButton;
