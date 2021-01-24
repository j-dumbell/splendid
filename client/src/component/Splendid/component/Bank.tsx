import React from "react";

import Gem from "./Gem";
import { Resource } from "../domain";

type Props = {
  bank: Record<string, number>;
  hideEmpty?: boolean;
  mini?: boolean;
};

const Bank = ({ bank, hideEmpty, mini }: Props) => {
  const keys: Resource[] = ["black", "white", "red", "blue", "green", "yellow"];
  const gems = keys.map((key) =>
    hideEmpty && !bank[key] ? null : (
      <div>
        <Gem colour={key} mini={mini} />
        {bank[key]}
      </div>
    )
  );
  return <>{gems}</>;
};

export default Bank;
