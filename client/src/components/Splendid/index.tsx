import React from "react";
import { useSelector } from "react-redux";

import { State } from "../../state/domain";
import TakeResourceForm from "./Forms/TakeResourceForm";
import CardActionForm from "./Forms/CardActionForm";

const Splendid = () => {
  const game = useSelector(({ game }: State) => game);
  if (!game) {
    return null;
  }
  return (
    <>
      <TakeResourceForm resourceList={game.board.bank} />
      <CardActionForm {...game} />
    </>
  );
};

export default Splendid;
