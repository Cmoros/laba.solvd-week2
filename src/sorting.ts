const swap = (arr: unknown[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const randomNumber = (min: number, max: number): number =>
  min + Math.floor(Math.random() * (max - min + 1));

export const bubbleSort = (arr: number[]) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
  return arr;
};

export const quickSort2 = (arr: number[]) => {
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

// export function quickSort(arr: number[]): number[] {
//   if (arr.length <= 1) {
//     return arr;
//   }

//   const pivot = arr[arr.length - 1];
//   const leftArr = [];
//   const rightArr = [];

//   for (let i = 0; i < arr.length - 1; i++) {
//     arr[i] < pivot ? leftArr.push(arr[i]) : rightArr.push(arr[i]);
//   }

//   return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
// }

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
