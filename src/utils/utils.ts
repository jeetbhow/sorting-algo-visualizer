import BarData from "../model/BarData";
import BarCollection from "../model/BarCollection";

export const AppData = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 500,
  MAX_VALUE: 50,
};

export enum Color {
  DEFAULT = "black",
  OUTER_INDEX = "green",
  INNER_INDEX = "red",
}

export enum Algorithms {
  SELECTION_SORT = 0,
  INSERTION_SORT = 1,
}
/**
 * Data type that's yielded/returned by the generator functions
 * for these sorting algorithms.
 */
export type GeneratorResult = {
  data: BarData[];
  colors?: Record<number, string>;
};

/**
 * Generator for selection sort. Selection sort has a time complexity
 * of O(n^2). It searches the collection for the minimum element,
 * and then swaps it with the current element. The sorted partition
 * expands by 1 and the next element becomes the current element. This
 * process repeats until the entire collection is sorted.
 * @param collection the collection to be iterated through.
 * @returns an object containing the current state of the collection
 * and the locations of key indices and their color changes.
 */
export function* selectionSort(collection: BarCollection) {
  for (let i = 0; i < collection.getSize(); ++i) {
    let min = i;
    for (let j = min; j < collection.getSize(); ++j) {
      yield { data: collection, colors: { [i]: "green", [j]: "red" } };
      if (collection.getAt(j).data < collection.getAt(min).data) {
        min = j;
      }
    }
    collection.swap(i, min);
  }
  return { data: collection };
}

/**
 * Generator for insertion sort. Insertion sort has a time complexity of O(n^2).
 * It places the current element into its correct position by swapping adjacent
 * elements in the sorted partition. The sorted partition then expands by 1, and
 * the next element becomes the current element. This process repeats until the
 * entire collection is sorted.
 * @param collection the collection to be iterated through.
 * @returns an object containing the current state of the collection
 * and the locations of key indices and their color changes.
 */
export function* insertionSort(collection: BarCollection) {
  for (let i = 1; i < collection.getSize(); ++i) {
    let curr = i;
    while (
      curr > 0 &&
      collection.getAt(curr).data < collection.getAt(curr - 1).data
    ) {
      collection.swap(curr - 1, curr);
      --curr;
      yield { data: collection, colors: { [i]: "green", [curr]: "red" } };
    }
  }
  return { data: collection };
}
