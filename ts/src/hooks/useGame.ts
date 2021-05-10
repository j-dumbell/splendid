import { useSelector } from "react-redux";
import { SplendidForm, SplendidGame } from "../components/Splendid/domain";

import { State } from "../state/domain";

export const useGame = (): [SplendidForm, SplendidGame?] => {
  const { form, response } = useSelector(({ game }: State) => game);
  return [form, response];
};
