import { SplendidResourceList, SplendidResource } from "../domain";

export const validateMax = (values: SplendidResourceList): boolean => {
  console.log(values);
  const totalCount = Object.keys(values).reduce((prev, next) => values[next as SplendidResource] + prev, 0);
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
