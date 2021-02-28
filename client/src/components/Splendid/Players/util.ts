import {
  SplendidResourceList,
  SplendidResource,
  SplendidCard,
  SplendidPlayer,
} from "../domain";

export const validateMax = (values: SplendidResourceList): boolean => {
  const totalCount = Object.keys(values).reduce(
    (prev, next) => values[next as SplendidResource] + prev,
    0
  );
  const counts = Object.keys(values).reduce((prev, next) => {
    const count = values[next as SplendidResource];
    return {
      ...prev,
      [count]: prev[count] ? prev[count] + 1 : 1,
    };
  }, {} as Record<string, number>);

  if (
    (counts[1] === 3 && counts[0] === 3) ||
    (counts[2] === 1 && counts[0] === 5) ||
    totalCount <= 2
  ) {
    return true;
  }

  return false;
};

const sum = (numbers: number[]): number =>
  numbers.reduce((prev, next) => prev + next, 0);

export const getScore = ({ purchased, elites }: SplendidPlayer): number => {
  const purchasedPoints = sum(purchased.map(({ points }) => points!));
  const elitePoints = sum(elites.map(({ points }) => points));
  return purchasedPoints + elitePoints;
};

export const constructOffsetsPerm = (
  resource: SplendidResource,
  purchased?: SplendidCard[]
) => purchased?.filter((card) => card.income === resource).length || 0;

export const sortPlayers = (players: SplendidPlayer[], clientId?: number) => {
  if (!clientId) {
    return players;
  }
  
  const index = players.findIndex((p) => p.id === clientId);
  return players.slice(index+1).concat(players.slice(0, index+1));
};
