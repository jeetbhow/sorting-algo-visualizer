import BarData from "./BarData";

/**
 * Represents a fixed collection of n Bars with integer values
 * ranging from 1 - n arranged in a random order.
 */
class BarCollection {
  private items: BarData[] = [];
  private size: number = 0;

  /**
   * Returns a BarCollection with the given list of BarData objects.
   * @param items the list of BarData objects to build the collection.
   */
  constructor(items?: BarData[]) {
    if (items) {
      this.items = items;
      this.size = items.length;
    }
  }

  /**
   * Erase the previous collection and create new a collection of n Bars
   * of the default color and with integer values that increase incrementally
   * from 1 - n.
   */
  createBars(size: number): void {
    this.items = [];
    for (let i = 1; i <= size; ++i) {
      this.items.push(new BarData("black", i));
    }
    this.size = size;
  }

  /**
   * Shuffle the collection such that each Bar is assigned a random position.
   */
  shuffle(): void {
    for (let i = this.size - 1; i > 0; --i) {
      const randomIndex = Math.round(Math.random() * i);
      this.swap(randomIndex, i);
    }
  }

  /**
   * Swap the Bars at position leftIndex and rightIndex.
   */
  swap(leftIndex: number, rightIndex: number): void {
    const temp = this.items[leftIndex];
    this.items[leftIndex] = this.items[rightIndex];
    this.items[rightIndex] = temp;
  }

  /**
   * Returns the BarData at the given index.
   * @param index the location of the Bar.
   */
  getAt(index: number): BarData {
    return this.items[index];
  }

  /**
   * Returns the array of items in the collection.
   * @returns the array of items in the collection.
   */
  getItems() {
    return this.items;
  }

  /**
   * Return the size of the collection.
   * @returns the size of the collection.
   */
  getSize(): number {
    return this.size;
  }

  /**
   * Prints the contents of the collection to the console.
   */
  print(): void {
    console.log(this.items);
  }
}

export default BarCollection;
