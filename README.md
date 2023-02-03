# Week 2 Homework

### Laba.Solvd Nodejs Course

## About

---

### Assignment

1.  Write a function that adds a number passed to it to an internal sum and returns itself with its internal sum set to the new value, so it can be chained in a functional manner. Example of usage:

        sum(1) //1
        sum(1)(2) //2
        sum(1)(2)(3)(4)(5)(6)(7) //28

2.  Write a realisation of a debounce function, here is the specification:

        debounce(func, [wait=0])

    Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since the last time the debounced function was invoked. The func is invoked with the last arguments provided to the debounced function. Subsequent calls to the debounced function return the result of the last func invocation.

3.  Found length of array on which QuickSort starts working faster then BubbleSort

    You should implement sorts by your own

    For sorting use 3 types of arrays

    - Sorted
    - Sorted Backward
    - With random placement of element

    You can start with 2 elements and than increment number of element
    When you reach result, run it few times to check different random on arrays
    After you found result you can check few more length to compare how fast time growth on BubbleSort comparing to QuickSort

4.  For the following Θ-difficulties, write strict and non-strict O-limits and, optionally, strict and non-strict Ω-limits (provided that they exist).
    1. Θ( 1 )
    2. Θ( √n )
    3. Θ( n )
    4. Θ( n^2 )
    5. Θ( n^3 )

## Getting Started

---

### Prerequisites

```sh
npm install npm@latest -g
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Cmoros/laba.solvd-week2.git
   ```
2. Go to the project folder

   ```sh
   cd laba.solvd-week2
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

## Usage

---

To Test All (if it fails, consider reading below the comparing part):

```sh
npm t
```

- Testing sum:

      npm run test:sum

- Testing bounce:
  npm run test:bounce
- Testing quicksort:

      npm run test:quicksort

- Testing bubblesort:

      npm run test:bubblesort

- Testing all comparisson between QuickSort and BubbleSort. Considerar that if some test fails, it is because the tests assume that bubblesort is father than quicksort in range of 2 to 5, if that doesn't happen, then the test fails, meaning that in that specific sorted array, that assumption doesn't happen.

      npm run test:comparing

  Testing in particular:

  - Sorted Arrays:

        npm run test:sorted

  - Sorted Backward Arrays:

        npm run test:backward

  - Sorted Random Arrays:

        npm run test:random

---

## Comparing Results

Consider tests are done in a range of up to 50 elements in an Array, and each number of the array is in range of 0 to 1000 produced randomly with `Math.random()`

### Sorted Array

QuickSort never gets to beat bubbleSort at any length.

### SortedBackward

In these tests, quicksort often get to beat bubblesort at 2 elements, then it doesn't beat bubblesort until 36-39 range, for that reason, first test with `npm run test:backward` or the test that involves sorted backward with `npm run test:comparing` can fail. It also gets differente results with a different `NUMBER_OF_TESTS`

### Random

Quick gets to beat bubbleSort in 9-11 range.
