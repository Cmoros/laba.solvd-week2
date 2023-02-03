export const swap = (arr: unknown[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};
