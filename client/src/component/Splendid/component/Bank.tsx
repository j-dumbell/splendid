import React from "react";

import Gem from "./Gem";
import { Resource } from "../domain";

type Props = {
  bank: Record<string, number>;
};

const Bank = ({ bank }: Props) => {
  const keys: Resource[] = ["black", "white", "red", "blue", "green", "yellow"];
  const gems = keys.map((key) => (
    <div>
      <Gem colour={key} />
      {bank[key]}
    </div>
  ));
  return <>{gems}</>;
};

export default Bank;
