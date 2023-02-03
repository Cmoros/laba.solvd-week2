import { bubbleSort } from "../src/bubbleSort";
import { quickSort } from "../src/quickSort";
import { createRandomArray } from "../src/testingUtils";

// The higher the numbers, the longer the time but better the results
const NUMBER_OF_TESTS = 1000;

const calculateTime = (arr: number[], sorting: (arr: number[]) => number[]) => {
  const copy = [...arr];
  const timeBubbleStart = performance.now();
  sorting(copy);
  const timeBubbleEnd = performance.now();
  return timeBubbleEnd - timeBubbleStart;
};

const calculateIsBubbleSortFaster = (
  size: number,
  comparissonFn?: (a: number, b: number) => number
): boolean => {
  const array = createRandomArray(size);
  if (comparissonFn) {
    array.sort(comparissonFn);
  }
  const calculateSortTimeOf = (sorting: (arr: number[]) => number[]) =>
    calculateTime(array, sorting);
  const bubbleTime = calculateSortTimeOf(bubbleSort);
  const quickTime = calculateSortTimeOf(quickSort);
  return quickTime > bubbleTime;
};

const testSmallArray = (comparissonFn?: (a: number, b: number) => number) => {
  const failingIndexes = [];
  let e;
  for (let i = 2; i <= 5; i++) {
    let bubbleCount = 0;
    let quickCount = 0;
    for (let j = 0; j < NUMBER_OF_TESTS; j++) {
      const isBubbleSortFaster = calculateIsBubbleSortFaster(i, comparissonFn);
      if (isBubbleSortFaster) {
        bubbleCount++;
      } else {
        quickCount++;
      }
    }
    try {
      expect(bubbleCount).toBeGreaterThan(quickCount);
    } catch (error: unknown) {
      failingIndexes.push(i);
      e = error;
    }
  }
  if (e) {
    console.error("Quicksort was faster in these indexes:", { failingIndexes });
    throw e;
  }
};

const testMediumArray = (comparissonFn?: (a: number, b: number) => number) => {
  const count: Record<number, [number, number]> = {};
  let firstTimeQuickWin: number | undefined;
  for (let i = 6; i <= 50; i++) {
    count[i] = [0, 0];
    for (let j = 0; j < NUMBER_OF_TESTS; j++) {
      const isBubbleSortFaster = calculateIsBubbleSortFaster(i, comparissonFn);
      if (isBubbleSortFaster) {
        count[i][0]++;
      } else {
        count[i][1]++;
      }
    }
    if (count[i][1] > count[i][0]) {
      firstTimeQuickWin ??= i;
    }
  }
  console.log(count);
  console.log("First time quicksort won: ", firstTimeQuickWin ?? "didn't won");
};

describe("sortedNormal", function sorted() {
  it("bubbleSort should be faster in small arrays (2 - 5)", function sortedSmallArrays() {
    testSmallArray((a, b) => a - b);
  });

  it("quicksort should be faster close to 10 (testing from 6 to 15)", function sortedMediumArrays() {
    console.log("Sorted -> Medium Array");
    testMediumArray((a, b) => a - b);
  });
});

describe("sortedBackward", function sortedBackward() {
  it("bubbleSort should be faster in small arrays (2 - 5)", function sortedBackwardSmallArrays() {
    testSmallArray((a, b) => b - a);
  });

  it("quicksort should be faster close to 10 (testing from 6 to 15)", function sortedBackwardMediumArrays() {
    console.log("Sorted Backward -> Medium Array");
    testMediumArray((a, b) => b - a);
  });
});

describe("sortedRandom", function randomSort() {
  it("bubbleSort should be faster in small arrays (2 - 5)", function smallArrayRandom() {
    testSmallArray();
  });

  it("quicksort should be faster close to 10 (testing from 6 to 15)", function mediumArrayRandom() {
    console.log("Random -> Medium Array");
    testMediumArray();
  });
});
