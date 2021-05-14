import { useSelector } from "react-redux";

import { State } from "../state/domain";

export const usePlayerNames = (): [Record<number, string>] => {
  const playerNames = useSelector(({ playerNames }: State) => playerNames);
  return [playerNames];
};
