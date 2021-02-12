import {
  SplendidResourceList,
  SplendidResource,
  SplendidCard,
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

export const getScore = (purchased: SplendidCard[]): number =>
  purchased.reduce(
    (prev, next) => (next.points ? prev + next.points : prev),
    0
  );

export const constructOffsetsPerm = (
  resource: SplendidResource,
  purchased?: SplendidCard[]
) => purchased?.filter((card) => card.income === resource).length || 0;
