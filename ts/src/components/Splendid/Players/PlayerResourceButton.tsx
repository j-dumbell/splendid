import React from "react";

import { SplendidResource } from "../domain";
import Button from "../../common/Button";
import { useGame } from "../../../hooks/useGame";

type Props = {
  disabled: boolean;
  resource: SplendidResource;
  nextValueFn: (value: number) => number;
};

const PlayerResourceButton = ({ disabled, resource, nextValueFn }: Props) => {
  const [form] = useGame();
  const currentValue = form.resources[resource];
  const nextValue = nextValueFn(currentValue);
  return (
    <Button
      disabled={disabled}
      type="button"
      onClick={() => console.log({
        ...form.resources,
        [resource]: nextValue,
      })}
    >
      {nextValue < currentValue ? "-" : "+"}
    </Button>
  );
};

export default PlayerResourceButton;
