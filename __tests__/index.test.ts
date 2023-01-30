import { debounce, sum } from "../src";

describe("sum", () => {
  it("should work with only 1 number", () => {
    const sum0 = sum(0);
    expect(sum0()).toBe(0);

    const sum1 = sum(1);
    expect(sum1()).toBe(1);

    const sum9 = sum(9);
    expect(sum9()).toBe(9);

    const sum10 = sum(10);
    expect(sum10()).toBe(10);

    const sum150 = sum(150);
    expect(sum150()).toBe(150);
  });

  it("should work with many numbers", () => {
    expect(sum(10)(10)()).toBe(20);

    expect(sum(1)(2)(3)()).toBe(6);

    expect(sum(5)(5)(5)(5)()).toBe(20);

    expect(sum(25)(50)(75)(100)()).toBe(250);
  });
});

describe("debounce", () => {
  const callFnIn = <T extends (...args: any[]) => void>(
    fn: T,
    timeout: number,
    ...args: Parameters<T>
  ) => setTimeout(() => fn(...args), timeout);
  jest.useFakeTimers();

  it("should debounce the funcion with 1 second", () => {
    const testo = jest.fn(console.log);
    const debounceTime = 1000;
    const debounced = debounce(testo, debounceTime);

    debounced("This is the first test");

    expect(testo).not.toHaveBeenCalled();

    jest.advanceTimersByTime(debounceTime);
    expect(testo).toHaveBeenCalledTimes(1);
  });

  it("should only call the fn the last time it was invoked", () => {
    const testo = jest.fn(console.log);
    const timeUntilCallLastTimeDebounce = 500;
    const debounceTime = 1000;
    const debounced = debounce(testo, debounceTime);

    callFnIn(debounced, 200, "This shouldn't print");
    callFnIn(debounced, 300, "This shouldn't either");
    callFnIn(debounced, timeUntilCallLastTimeDebounce, "This one should");

    expect(testo).not.toHaveBeenCalled();

    jest.advanceTimersByTime(200);
    expect(testo).not.toHaveBeenCalled();

    jest.advanceTimersByTime(100);
    expect(testo).not.toHaveBeenCalled();

    jest.advanceTimersByTime(
      timeUntilCallLastTimeDebounce - 200 - 100 + debounceTime
    );
    expect(testo).toHaveBeenCalledTimes(1);
  });

  it("can be called many times in diferent intervals", () => {
    const testo = jest.fn(console.log);
    const debounceTime = 150;
    const debounced = debounce(testo, debounceTime);

    const times = [0, 300, 800, 1000];

    callFnIn(debounced, times[0], "This should print 1st time");
    callFnIn(debounced, times[1], "This should print 2nd time");
    callFnIn(debounced, times[2], "This should print 3rd time");
    callFnIn(debounced, times[3] - 5, "This should not print anything'");
    callFnIn(debounced, times[3], "This should print last time");

    expect(testo).not.toHaveBeenCalled();

    jest.advanceTimersByTime(debounceTime);

    jest.advanceTimersByTime(times[0]);
    expect(testo).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(times[1] - times[0]);
    expect(testo).toHaveBeenCalledTimes(2);

    jest.advanceTimersByTime(times[2] - times[1]);
    expect(testo).toHaveBeenCalledTimes(3);

    jest.advanceTimersByTime(times[3] - times[2]);
    expect(testo).toHaveBeenCalledTimes(4);
  });
});
