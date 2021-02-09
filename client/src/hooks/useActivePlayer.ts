import { useSelector } from "react-redux";
import { State } from "../state/domain";

export const useActivePlayer = () => {
  const { game, clientId } = useSelector(({ game, clientId }: State) => ({
    game,
    clientId,
  }));
  const isActivePlayer = game
    ? game.players[game.activePlayerIndex].id === clientId
    : undefined;
    
  return [isActivePlayer];
};
