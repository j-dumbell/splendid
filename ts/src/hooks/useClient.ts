import { useSelector } from "react-redux";

import { State } from "../state/domain";

export const useClient = (): [Record<number, string>, number?] => {
  const { clientId, playerNames } = useSelector(
    ({ playerNames, clientId }: State) => ({
      playerNames,
      clientId,
    })
  );
  return [playerNames, clientId];
};
