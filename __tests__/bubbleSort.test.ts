import { bubbleSort } from "../src/bubbleSort";
import { createRandomArray } from "../src/testingUtils";

describe("bubbleSort", () => {
  it("should work with 1 element", function bubbleSort1El() {
    expect(bubbleSort([3])).toEqual([3]);
    expect(bubbleSort([5])).toEqual([5]);
    expect(bubbleSort([28])).toEqual([28]);
  });

  it("should work with 2 elements", function bubbleSort2El() {
    expect(bubbleSort([3, 10])).toEqual([3, 10]);
    expect(bubbleSort([10, 3])).toEqual([3, 10]);
    expect(bubbleSort([5, 20])).toEqual([5, 20]);
    expect(bubbleSort([20, 5])).toEqual([5, 20]);
    expect(bubbleSort([28, 40])).toEqual([28, 40]);
    expect(bubbleSort([40, 28])).toEqual([28, 40]);
  });

  it("should work with arrays filled with random numbers", function bubbleSortLongerArrays() {
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
