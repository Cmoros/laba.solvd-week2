type Sum = (num: number) => AddToSum;

type AddToSum = {
  (anotherNum: number): ReturnType<Sum>;
  (): Parameters<Sum>[0];
};

export const sum: Sum = (currentSum: number) => {
  const addToSum = (anotherNum?: number) =>
    anotherNum == null ? currentSum : sum(currentSum + anotherNum);
  return addToSum as AddToSum;
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
