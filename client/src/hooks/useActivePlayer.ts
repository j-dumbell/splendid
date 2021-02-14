import { useSelector } from "react-redux";

import { State } from "../state/domain";

export const useActivePlayer = (): [boolean?, number?] => {
  const { game, clientId } = useSelector(({ game, clientId }: State) => ({
    game,
    clientId,
  }));

  const activePlayerId = game
    ? game.players[game.activePlayerIndex].id
    : undefined;
  const isActivePlayer = activePlayerId === clientId;
  return [isActivePlayer, activePlayerId];
};
