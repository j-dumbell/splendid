import React from "react";
import { useSelector } from "react-redux";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Card from "../Card";
import { PlayerResourceList as ResourceList } from "../ResourceList";
import { State } from "../../../state/domain";

type Props = {
  players: SplendidPlayer[];
  activePlayerIndex: number;
};

const Players = ({ players, activePlayerIndex }: Props) => {
  const playerNames = useSelector(({ playerNames }: State) => playerNames);
  return (
    <div style={{ marginLeft: "50px" }}>
      {players.map((player, i) => (
        <FlexContainer
          column
          key={`player-${i}`}
          style={{
            padding: "10px",
            border: `${i === activePlayerIndex ? "solid 2px white" : "solid 0px black"}`,
          }}
        >
          <h2>{playerNames[player.id]}</h2>
          <FlexContainer color="white">
            <ResourceList
              resourceList={player.bank}
              purchased={player.purchased}
              hideEmpty
            />
          </FlexContainer>
          <FlexContainer>
            {player.purchased.map((card, j) => (
              <Card key={`player-purchased-card-${j}`} mini {...card} />
            ))}
            <FlexContainer style={{ opacity: 0.3 }}>
              {player.reservedVisible.map((card, j) => (
                <Card key={`player-reserved-vis-card-${j}`} mini {...card} />
              ))}
              {player.reservedHidden.map((card, j) => (
                <Card key={`player-reserved-hid-card-${j}`} mini {...card} />
              ))}
            </FlexContainer>
          </FlexContainer>
        </FlexContainer>
      ))}
    </div>
  );
};

export default Players;
