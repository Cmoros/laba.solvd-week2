import { quickSort, bubbleSort } from "../src/sorting";

const createRandomArray = (length: number): number[] => {
  const arr = Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = Math.floor(Math.random() * (1000 + 1));
  }
  return arr;
};

describe("bubbleSort", () => {
  it("should work with 1 element", () => {
    expect(bubbleSort([3])).toEqual([3]);
    expect(bubbleSort([5])).toEqual([5]);
    expect(bubbleSort([28])).toEqual([28]);
  });

  it("should work with 2 elements", () => {
    expect(bubbleSort([3, 10])).toEqual([3, 10]);
    expect(bubbleSort([10, 3])).toEqual([3, 10]);
    expect(bubbleSort([5, 20])).toEqual([5, 20]);
    expect(bubbleSort([20, 5])).toEqual([5, 20]);
    expect(bubbleSort([28, 40])).toEqual([28, 40]);
    expect(bubbleSort([40, 28])).toEqual([28, 40]);
  });

  it("should work with arrays filled with random numbers", () => {
    const arr1 = createRandomArray(10);
    const copy1 = [...arr1];
    expect(bubbleSort(arr1)).toEqual(copy1.sort((a, b) => a - b));

    const arr2 = createRandomArray(100);
    const copy2 = [...arr2];

    expect(bubbleSort(arr2)).toEqual(copy2.sort((a, b) => a - b));

    const arr3 = createRandomArray(1000);
    const copy3 = [...arr3];
    expect(bubbleSort(arr3)).toEqual(copy3.sort((a, b) => a - b));
  });
});

describe("quickSort", () => {
  it("should work with 1 element", () => {
    expect(quickSort([3])).toEqual([3]);
    expect(quickSort([5])).toEqual([5]);
    expect(quickSort([28])).toEqual([28]);
  });

  it("should work with 2 elements", () => {
    expect(quickSort([3, 10])).toEqual([3, 10]);
    expect(quickSort([10, 3])).toEqual([3, 10]);
    expect(quickSort([5, 20])).toEqual([5, 20]);
    expect(quickSort([20, 5])).toEqual([5, 20]);
    expect(quickSort([28, 40])).toEqual([28, 40]);
    expect(quickSort([40, 28])).toEqual([28, 40]);
  });

  it("should work with arrays filled with random numbers", () => {
    const arr1 = createRandomArray(10);
    const copy1 = [...arr1];
    expect(quickSort(arr1)).toEqual(copy1.sort((a, b) => a - b));

    const arr2 = createRandomArray(100);
    const copy2 = [...arr2];

    expect(quickSort(arr2)).toEqual(copy2.sort((a, b) => a - b));

    const arr3 = createRandomArray(1000);
    const copy3 = [...arr3];
    expect(quickSort(arr3)).toEqual(copy3.sort((a, b) => a - b));
  });
});

describe("bubbleSort vs QuickSort", () => {
  const calculateTime = (
    arr: number[],
    sorting: (arr: number[]) => number[]
  ) => {
    const copy = [...arr];
    const timeBubbleStart = performance.now();
    sorting(copy);
    const timeBubbleEnd = performance.now();
    return timeBubbleEnd - timeBubbleStart;
  };

  it("bubbleSort should be faster in small arrays (2 - 5)", () => {
    for (let i = 2; i <= 5; i++) {
      const current: [number, number] = [0, 0];
      for (let j = 0; j < 1000; j++) {
        const calculateSortTimeOf = (sorting: (arr: number[]) => number[]) =>
          calculateTime(createRandomArray(i), sorting);

        const bubbleTime = calculateSortTimeOf(bubbleSort);
        const quickTime = calculateSortTimeOf(quickSort);
        if (quickTime < bubbleTime) {
          current[1]++;
        } else {
          current[0]++;
        }
      }
      expect(current[0]).toBeGreaterThan(current[1]);
    }
  });

  it("should vary in 6-15 range", () => {
    for (let i = 6; i <= 15; i++) {
      const calculateSortTimeOf = (sorting: (arr: number[]) => number[]) =>
        calculateTime(createRandomArray(i), sorting);

      const bubbleTime = calculateSortTimeOf(bubbleSort);
      const quickTime = calculateSortTimeOf(quickSort);
      console.log(`Size: ${i}`, { bubbleTime }, "vs", { quickTime });

      try {
        expect(quickTime).toBeGreaterThan(bubbleTime);
        console.log(`bubblesort faster with ${i} elements`);
      } catch (e) {
        console.log(`quicksort faster with ${i} elements`);
      }
    }
  });

  it("quicksort should be faster close to 10 (testing from 6 to 15)", () => {
    // [bubble win count, quick win count]
    const count: Record<number, [number, number]> = {};
    let firstTimeQuickWin: number | undefined;
    for (let i = 6; i <= 20; i++) {
      count[i] = [0, 0];
      for (let j = 0; j < 1000; j++) {
        const calculateSortTimeOf = (sorting: (arr: number[]) => number[]) =>
          calculateTime(createRandomArray(i), sorting);

        const bubbleTime = calculateSortTimeOf(bubbleSort);
        const quickTime = calculateSortTimeOf(quickSort);
        if (quickTime < bubbleTime) {
          count[i][1]++;
        } else {
          count[i][0]++;
        }
      }
      if (count[i][1] > count[i][0]) {
        firstTimeQuickWin ??= i;
      }
    }
    console.log(count);
    console.log(
      "First time quicksort won: ",
      firstTimeQuickWin ?? "didn't won"
    );
  });
});
