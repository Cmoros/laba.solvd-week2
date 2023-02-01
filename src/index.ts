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

type Debounce = <T extends (...args: any[]) => void>(
  fn: T,
  timeout: number
) => DebouncedFn<T>;

type DebouncedFn<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

export const debounce: Debounce = (fn, timeout) => {
  let timeoutToClear: NodeJS.Timeout;
  return (...args) => {
    clearTimeout(timeoutToClear);
    timeoutToClear = setTimeout(() => {
      fn(...args);
    }, timeout);
  };
};
