type Sum = (currentSum: number) => AddToSum;

type AddToSum = {
  (anotherNum: number): ReturnType<Sum>;
  valueOf: () => number;
};

export const sum: Sum = (currentSum) => {
  const addToSum = (anotherNum: number) => sum(currentSum + anotherNum);
  addToSum.valueOf = () => currentSum;
  addToSum.toString = () => `${currentSum}`;
  return addToSum;
};
