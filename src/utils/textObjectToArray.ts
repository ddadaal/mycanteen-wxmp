export const textObjectToArray = (o: object, key = "value", value = "text") =>
  Object.entries(o)
    .reduce((prev, curr) => {
      prev.push({ [key]: curr[0], [value]: curr[1] });
      return prev;
    }, [] as {}[]);
