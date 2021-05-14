import { useClientId } from "./useClientId";
import { useGame } from "./useGame";

export const useActivePlayer = (): [boolean?, number?, number?] => {
  const [, game] = useGame();
  const [clientId] = useClientId();

  const activePlayerId = game
    ? game.players[game.activePlayerIndex].id
    : undefined;
  const isActivePlayer = activePlayerId === clientId;
  return [isActivePlayer, activePlayerId, clientId];
};
