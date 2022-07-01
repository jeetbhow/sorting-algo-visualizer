import { AppData } from "./utils/utils";
import { Algorithms } from "./utils/utils";
import React, { useState, useRef } from "react";
import Canvas from "./components/Canvas";
import SortButton from "./components/SortButton";
import BarData from "./model/BarData";
import AlgoSelector from "./components/AlgoSelector";
import RandomizeButton from "./components/RandomizeButton";

// insertion sort generator. 
const insertionSort = function* (array: BarData[]) {
  for (let i = 1; i < array.length; ++i) {
    for (let j = i; j > 0; --j) {
      yield { curr: i, left: j - 1, right: j, array: array, before: true };
      if (array[j - 1].data > array[j].data) {
        [array[j - 1], array[j]] = [array[j], array[j - 1]];
      }
      yield { curr: i, left: j - 1, right: j, array: array, before: false };
    }
  }
  return array;
}

const selectionSort = function* (array: BarData[]) {
  for (let i = 0; i < array.length; ++i) {
    let min = i;
    for (let j = min; j < array.length; ++j) {
      yield { iter: i, index: j, array: array, before: true, loop: false }
      if (array[j].data < array[min].data) {
        min = j;
      }
      yield { iter: i, index: j, array: array, before: false, loop: false };
    }
    [array[i], array[min]] = [array[min], array[i]];
    yield { iter: i, index: min, array: array, before: false, loop: true };
  }
  return array;
}

// create a series of random bars. 
const bars: BarData[] = [];
for (let i = 1; i <= AppData.MAX_VALUE; ++i) {
  bars.push(new BarData(i, AppData.DEFAULT_COLOR));
}

function shuffle(bars: BarData[]) {
  for (let i = AppData.MAX_VALUE - 1; i > 0; --i) {
    const randIndex = Math.round(Math.random() * i);
    [bars[randIndex], bars[i]] = [bars[i], bars[randIndex]];
  }
}

shuffle(bars);

function App() {

  const [currAlgo, setCurrAlgo] = useState(Algorithms.SELECTION_SORT);
  const [array, setArray] = useState(bars);
  const generator = useRef<Generator<{ curr: number, left: number, right: number, before: boolean, array: BarData[] }, BarData[], boolean>>(insertionSort(bars));
  const ssgen = useRef<Generator<{ iter: number, index: number, array: BarData[], before: boolean, loop: boolean }, BarData[], boolean>>(selectionSort(bars));

  const handleAlgoChange = (type: number) => {
    console.log(type);
    setCurrAlgo(type);
    if (type === Algorithms.INSERTION_SORT) {
      generator.current = insertionSort(array);
    } else if (type === Algorithms.SELECTION_SORT) {
      ssgen.current = selectionSort(array);
    }
  };

  const randomize = () => {
    const temp = [...array];
    shuffle(temp);
    setArray(temp);
    if (currAlgo === Algorithms.INSERTION_SORT) {
      generator.current = insertionSort(temp);
    } else if (currAlgo === Algorithms.SELECTION_SORT) {
      ssgen.current = selectionSort(temp);
    }
  };

  const sort = () => {
    if (currAlgo === Algorithms.INSERTION_SORT) {
      insertionSortIter();
    } else if (currAlgo === Algorithms.SELECTION_SORT) {
      selectionSortIter();
    }
  }

  const selectionSortIter = () => {
    const timer = setInterval(() => {
      const result = ssgen.current.next();
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
    }, 1);
  }

  const insertionSortIter = () => {
    const timer = setInterval(() => {
      const result = generator.current.next();
      if (!result.done) {
        const left = result.value.left;
        const right = result.value.right;
        const before = result.value.before;

        if (result.value.curr !== AppData.MAX_VALUE - 1) {
          array[result.value.curr].color = 'green';
        } else {
          array[result.value.curr].color = AppData.DEFAULT_COLOR;
        }

        if (before) {
          array[left].color = "red";
          array[right].color = "red";
        } else {
          array[left].color = AppData.DEFAULT_COLOR;
          array[right].color = AppData.DEFAULT_COLOR;
        }

        setArray([...result.value.array]);

      } else {
        clearInterval(timer);
      }
    }, 1)
  }

  return (
    <React.Fragment>
      <AlgoSelector handleChange={handleAlgoChange} />
      <SortButton onClick={sort} />
      <RandomizeButton onClick={randomize} />
      <Canvas array={array} />
    </React.Fragment>
  );
}

export default App;
