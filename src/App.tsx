import AppData from "./utils/utils";
import React, { useState, useRef } from "react";
import Canvas from "./components/Canvas";
import SortButton from "./components/SortButton";
import BarData from "./model/BarData";

// insertion sort generator. 
function* insertionSort(array: BarData[]) {
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

// we're going to generate an array of numbers from 1 - MAX_VALUE 
const bars: BarData[] = [];
for (let i = 1; i <= AppData.MAX_VALUE; ++i) {
  bars.push(new BarData(i, AppData.DEFAULT_COLOR));
}

for (let i = AppData.MAX_VALUE - 1; i > 0; --i) {
  const randIndex = Math.round(Math.random() * i);
  [bars[randIndex], bars[i]] = [bars[i], bars[randIndex]];
}

function App() {

  const [array, setArray] = useState(bars);
  const generator = useRef<Generator<{ curr: number, left: number, right: number, before: boolean, array: BarData[] }, BarData[], boolean>>(insertionSort(bars));

  const sort = () => {
    const timer = setInterval(() => {
      const result = generator.current.next();
      if (!result.done) {
        const left = result.value.left;
        const right = result.value.right;
        const before = result.value.before;

        array[result.value.curr].color = 'green';

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
      <SortButton onClick={sort} />
      <Canvas array={array} />
    </React.Fragment>
  );
}

export default App;
