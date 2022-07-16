import BarCollection from "./BarCollection";
import BarData from "./BarData";

/**
 * Data type that's returned when the generator in SortingAlgorithm
 * hits a yield statement.
 */
type TYield = {
  data: BarCollection;
  tracker?: { index: number; value: number };
  colors?: Record<number, string>;
};

type TReturn = {
  data: BarCollection;
};

/**
 * Represents a SortingAlgorithm. Each SortingAlgorithm contains a generator
 * that applies a particular algorithm to a BarCollection and yields
 * step-by-step information about that algorithm. This information is stored
 * in an Object of type TYield.
 */
class SortingAlgorithm implements Iterator<TYield, TReturn> {
  private generator: Generator<TYield, TReturn>;

  constructor(generator: Generator<TYield, TReturn>) {
    this.generator = generator;
  }

  /**
   * Returns the next value from the generator.
   * @returns an Object of type TYield which stores the BarCollection
   * as well as the key indices and their corresponding color changes.
   */
  next(): IteratorResult<TYield, TReturn> {
    return this.generator.next();
  }
}

export default SortingAlgorithm;
