import { useSelector } from "react-redux";

import { State } from "../state/domain";

export const useClientId = (): [number?] => {
  const clientId = useSelector(({ clientId }: State) => clientId);
  return [clientId];
};
