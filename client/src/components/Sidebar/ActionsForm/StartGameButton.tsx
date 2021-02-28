import React from "react";

import Button from "../../common/Button";
import { useGame } from "../../../hooks/useGame";
import { useLobbyId } from "../../../hooks/useLobbyId";
import { sendJSON } from "../../../hooks/useWebsocket";
import { useSelector } from "react-redux";
import { State } from "../../../state/domain";

const StartGameButton = () => {
  const [lobbyId] = useLobbyId();
  const [game] = useGame();
  const { playerNames, clientId } = useSelector(
    ({ playerNames, clientId }: State) => ({
      playerNames,
      clientId,
    })
  );

  const isFirstJoiner = Object.keys(playerNames)[0] === clientId?.toString();

  if (!lobbyId || game || !isFirstJoiner) {
    return null;
  }
  return (
    <Button
      onClick={() =>
        sendJSON({ action: "game", params: { gameAction: "startGame" } })
      }
    >
      Start Game
    </Button>
  );
};

export default StartGameButton;
