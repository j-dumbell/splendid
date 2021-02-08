export const validateMax = (form: Record<string, number>) => {
  const keys = Object.keys(form);
  const values = Object.values(form);
  const maxTotal = keys.reduce((prev, next) => prev + form[next], 0);
  if (maxTotal > 3) {
    return keys.reduce((prev, next) => ({ ...prev, [next]: "max" }), {});
  }
  const maxSingle = values.some((value) => value > 2);
  if (maxSingle) {
    return keys.reduce((prev, next) => ({ ...prev, [next]: "max" }), {});
  }
  const maxMixture = values.some((value) => value === 2) && maxTotal > 2;
  if (maxMixture) {
    return keys.reduce((prev, next) => ({ ...prev, [next]: "max" }), {});
  }
  return {};
};
