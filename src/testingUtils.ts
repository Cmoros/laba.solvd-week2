export const createRandomArray = (length: number): number[] => {
  const arr = Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = Math.floor(Math.random() * (1000 + 1));
  }
  return arr;
};
