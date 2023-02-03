import { debounce } from "../src/debounce";

describe("debounce", () => {
  const callFnIn = <T extends (...args: any[]) => void>(
    fn: T,
    timeout: number,
    ...args: Parameters<T>
  ) => setTimeout(() => fn(...args), timeout);
  jest.useFakeTimers();

  it("should debounce the funcion with 1 second", function debounce1Sec() {
    const testo = jest.fn(console.log);
    const debounceTime = 1000;
    const debounced = debounce(testo, debounceTime);

    debounced("This is the first test");

    expect(testo).not.toHaveBeenCalled();

    jest.advanceTimersByTime(debounceTime);
    expect(testo).toHaveBeenCalledTimes(1);
  });

  it("should only call the fn the last time it was invoked", function debounceOnlyCallLast() {
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

  it("can be called many times in diferent intervals", function debounceIntervals() {
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
