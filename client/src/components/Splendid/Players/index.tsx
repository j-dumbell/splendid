import React from "react";
import { useSelector } from "react-redux";

import { SplendidPlayer } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import Card from "../Card";
import { PlayerResourceList as ResourceList } from "../ResourceList";
import { State } from "../../../state/domain";
import { PlayersContainer, PlayerContainer } from "./styled";
import DeckCard from "../Decks/DeckCard";
import { Formik, Form } from "formik";

type Props = {
  players: SplendidPlayer[];
  activePlayerIndex: number;
};

const Players = ({ players, activePlayerIndex }: Props) => {
  const playerNames = useSelector(({ playerNames }: State) => playerNames);
  return (
    <PlayersContainer>
      {players.map((player, i) => (
        <PlayerContainer
          column
          key={`player-${i}`}
          isActive={i === activePlayerIndex}
        >
          <h2>{playerNames[player.id]}</h2>
          <FlexContainer color="white">
            <ResourceList
              resourceList={player.bank}
              purchased={player.purchased}
              hideEmpty
            />
          </FlexContainer>
          <Formik onSubmit={() => {}} initialValues={{ selected: undefined }}>
            {({ values }) => (
              <Form>
                <FlexContainer>
                  {player.purchased.map((card, j) => (
                    <Card key={`player-purchased-card-${j}`} mini {...card} />
                  ))}
                  <FlexContainer>
                    {player.reservedVisible.map((card, j) => (
                      <DeckCard
                        reserved
                        mini
                        key={`player-reserved-vis-card-${j}`}
                        card={card}
                        selected={values.selected}
                      />
                    ))}
                    {player.reservedHidden.map((card, j) => (
                      <DeckCard
                        reserved
                        mini
                        key={`player-reserved-hid-card-${j}`}
                        card={card}
                        selected={values.selected}
                      />
                    ))}
                  </FlexContainer>
                </FlexContainer>
              </Form>
            )}
          </Formik>
        </PlayerContainer>
      ))}
    </PlayersContainer>
  );
};

export default Players;
