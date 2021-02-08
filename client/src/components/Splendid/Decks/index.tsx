import React from "react";
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";

import { SplendidBoard } from "../domain";
import FlexContainer from "../../common/FlexContainer";
import DeckCard from "./DeckCard";
import Card from "../Card";
import { DeckStack, StackCount } from "./styled";
import { State } from "../../../state/domain";

type Props = {
  decks: SplendidBoard["decks"];
};

const getDeckKeys = (decks: SplendidBoard["decks"]) =>
  Object.keys(decks).reverse();

const constructVisible = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => card.id);

const constructDeck = (tier: string, decks: SplendidBoard["decks"]) =>
  decks[tier].filter((card) => !card.id);

const Decks = ({ decks }: Props) => {
  const isActivePlayer = useSelector(
    ({ isActivePlayer }: State) => isActivePlayer
  );
  const { values } = useFormikContext<any>();
  return (
    <>
      {getDeckKeys(decks).map((tier, i) => (
        <FlexContainer key={`deck-${i}`}>
          {constructVisible(tier, decks).map((card, j) =>
            isActivePlayer ? (
              <DeckCard
                key={`cards-${j}`}
                card={card}
                selected={values.selected}
              />
            ) : (
              <Card key={`cards-${j}`} {...card} />
            )
          )}
          <DeckStack>
            <StackCount>{constructDeck(tier, decks).length}</StackCount>
            {isActivePlayer ? (
              <DeckCard
                card={{ tier: Number(tier) }}
                selected={values.selected}
              />
            ) : (
              <Card tier={Number(tier)} />
            )}
          </DeckStack>
        </FlexContainer>
      ))}
    </>
  );
};

export default Decks;
