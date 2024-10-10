export const selectRand = (arr: string[]) => {
  const len  = arr.length;
  const random = getRandom(len);
  return arr[random];
};

const getRandom = (max: number) => Math.floor(Math.random() * max) - 1;
