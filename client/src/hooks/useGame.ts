import { useSelector } from "react-redux";
import { SplendidGame } from "../components/Splendid/domain";

import { State } from "../state/domain";

export const useGame = (): [SplendidGame?] => {
  const game = useSelector(({ game }: State) => game);
  return [game];
};
