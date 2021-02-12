import { useSelector } from "react-redux";

import { State } from "../state/domain";

export const useLobbyId = () => {
  const lobbyId = useSelector(({ lobbyId }: State) => lobbyId);
  return [lobbyId];
};
