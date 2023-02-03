import { quickSort } from "../src/quickSort";
import { createRandomArray } from "../src/testingUtils";

describe("quickSort", () => {
  it("should work with 1 element", function quickSort1El() {
    expect(quickSort([3])).toEqual([3]);
    expect(quickSort([5])).toEqual([5]);
    expect(quickSort([28])).toEqual([28]);
  });

  it("should work with 2 elements", function quickSort2El() {
    expect(quickSort([3, 10])).toEqual([3, 10]);
    expect(quickSort([10, 3])).toEqual([3, 10]);
    expect(quickSort([5, 20])).toEqual([5, 20]);
    expect(quickSort([20, 5])).toEqual([5, 20]);
    expect(quickSort([28, 40])).toEqual([28, 40]);
    expect(quickSort([40, 28])).toEqual([28, 40]);
  });

  it("should work with arrays filled with random numbers", function quickSortLongerArrays() {
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
