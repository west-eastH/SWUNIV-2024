export const selectRand = (arr: string[]) => {
  const len = arr.length;
  const random = getRandom(len);
  let result = arr[random];
  while (!result) {
    const r = getRandom(len);
    result = arr[r];
  }
  return result;
};

const getRandom = (max: number) => Math.floor(Math.random() * max);
