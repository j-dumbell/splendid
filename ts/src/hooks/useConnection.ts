import { useSelector } from "react-redux";

import { State } from "../state/domain";

export const useConnection = (): [boolean, boolean, string?] => {
  const { loading, open, error } = useSelector(
    ({ connection }: State) => connection
  );
  return [loading, open, error];
};
