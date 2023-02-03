import { swap } from "./utilts";

export const quickSort = (arr: number[]) => {
  const go = (lo: number, hi: number) => {
    if (lo >= hi) return;

    const pivotIndex = hi;
    const pivot = arr[pivotIndex];
    let pivotPointer = lo;

    for (let i = lo; i < hi; i++) {
      if (arr[i] < pivot) {
        swap(arr, i, pivotPointer);
        pivotPointer++;
      }
    }

    swap(arr, hi, pivotPointer);

    go(lo, pivotPointer - 1);
    go(pivotPointer + 1, hi);
  };

  go(0, arr.length - 1);
  return arr;
};

// Slower
/*

const randomNumber = (min: number, max: number): number =>
  min + Math.floor(Math.random() * (max - min + 1));


export const quickSortWithRandomPivot = (arr: number[]) => {
  const go = (lo: number, hi: number) => {
    if (lo >= hi) return;

    const pivotIndex = randomNumber(lo, hi);
    const pivot = arr[pivotIndex];
    let pivotPointer = lo;

    swap(arr, pivotIndex, hi);

    for (let i = lo; i < hi; i++) {
      if (arr[i] < pivot) {
        swap(arr, i, pivotPointer);
        pivotPointer++;
      }
    }

    swap(arr, hi, pivotPointer);

    go(lo, pivotPointer - 1);
    go(pivotPointer + 1, hi);
  };

  go(0, arr.length - 1);
  return arr;
};
*/
