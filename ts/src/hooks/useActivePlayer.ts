import { useSelector } from "react-redux";

import { State } from "../state/domain";
import { useGame } from "./useGame";

export const useActivePlayer = (): [boolean?, number?, number?] => {
  const [, game] = useGame();
  const { clientId } = useSelector(({ game, clientId }: State) => ({
    game,
    clientId,
  }));

  const activePlayerId = game
    ? game.players[game.activePlayerIndex].id
    : undefined;
  const isActivePlayer = activePlayerId === clientId;
  return [isActivePlayer, activePlayerId, clientId];
};
