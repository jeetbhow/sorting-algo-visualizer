import {
  AppData,
  Algorithms,
  GeneratorResult,
  insertionSortGenerator,
  selectionSortGenerator,
  shuffle,
  createBars
} from "./utils/utils";
import React, { useState, useReducer } from "react";
import Canvas from "./components/Canvas";
import SortButton from "./components/SortButton";
import AlgoSelector from "./components/AlgoSelector";


// create a series of random bars. 
const bars = createBars();
shuffle(bars);

const iteratorReducer = (currState: Generator<any, any, any>, action: number) => {
  const copyArray = [...currState.next().value.array];
  switch (action) {
    case Algorithms.SELECTION_SORT:
      return selectionSortGenerator(copyArray);
    case Algorithms.INSERTION_SORT:
      return insertionSortGenerator(copyArray);
    default: return currState;
  }
}

function App() {
  const [currAlgo, setCurrAlgo] = useState(Algorithms.SELECTION_SORT);
  const [array, setArray] = useState(bars);
  const [colors, setColors] = useState([]);
  const [generator, dispatchIterator] = useReducer(iteratorReducer, selectionSortGenerator(bars));

  const handleAlgoChange = (type: number) => {
    dispatchIterator(type);
    setCurrAlgo(type);
  };

  /**
   * Pick the sorting algorithm that's currently selected and run it. 
   */
  const sort = () => {
    let algorithm: Function;
    switch (currAlgo) {
      case Algorithms.INSERTION_SORT:
        algorithm = insertionSort;
        break;
      default: algorithm = selectionSort;
    }
    const timer = setInterval(() => {
      algorithm(timer);
    }, 10);
  }

  const selectionSort = (timer: NodeJS.Timer) => {
    const result = generator.next();
    if (!result.done) {
      const index = result.value.index;
      const before = result.value.before;
      const array = result.value.array;

      if (result.value.iter !== AppData.MAX_VALUE - 1) {
        array[result.value.iter].color = 'green';
      } else {
        array[result.value.iter].color = AppData.DEFAULT_COLOR;
      }

      if (before) {
        array[index].color = "red";
      } else {
        array[index].color = AppData.DEFAULT_COLOR;
      }

      if (result.value.loop) {
        array[result.value.iter].color = AppData.DEFAULT_COLOR;
        array[result.value.index].color = AppData.DEFAULT_COLOR;
      }
      setArray([...array]);
    } else {
      clearInterval(timer);
    }
  }

  const insertionSort = (timer: NodeJS.Timer, generator: Generator<GeneratorResult, number[], boolean>) => {
    const result: IteratorResult<GeneratorResult, number[]> = generator.next();
    console.log(result);
  }

  return (
    <React.Fragment>
      <AlgoSelector handleChange={handleAlgoChange} />
      <SortButton onClick={sort} />
      <Canvas array={array} />
    </React.Fragment>
  );
}

export default App;
