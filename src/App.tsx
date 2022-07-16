import {
  Algorithms,
  selectionSort,
  Color,
  AppData,
  insertionSort
} from "./utils/utils";
import React, { useState, useReducer } from "react";
import Canvas from "./components/Canvas";
import SortButton from "./components/SortButton";
import AlgoSelector from "./components/AlgoSelector";
import BarCollection from "./model/BarCollection";
import SortingAlgorithm from "./model/SortingAlgorithm";
import BarData from "./model/BarData";

// Setup for the initial BarCollection. 
const initialCollection = new BarCollection();
initialCollection.createBars(AppData.MAX_VALUE);
initialCollection.shuffle();

// Setup for the initial SortingAlgorithm. 
const initialAlgorithm = new SortingAlgorithm(selectionSort(initialCollection));

// Reducer that sets the SortingAlgorithm settings. 
const algorithmReducer = (state: SortingAlgorithm, action: number) => {
  switch (action) {
    case Algorithms.INSERTION_SORT:
      return new SortingAlgorithm(insertionSort(state.next().value.data));
    default:
      return new SortingAlgorithm(selectionSort(state.next().value.data));
  }
}

function App() {
  const [collection, setCollection] = useState(initialCollection);
  const [algorithm, dispatchAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);

  const handleAlgoChange = (type: number) => {
    dispatchAlgorithm(type);
  };

  /**
   * Calls the next() function on the current instance of SortingAlgorithm 
   * to generate the next array from the algorithm and to set the colors to 
   * their appropriate values. 
   */
  const sort = () => {
    const id = setInterval(() => {
      const result = algorithm.next();
      if (!result.done && result.value.colors) {
        const colors = result.value.colors;
        const tracker = result.value.tracker;
        let newItems = [...collection.getItems()];
        newItems = newItems.map((barData, index) => {
          return new BarData(colors![index] ?? Color.DEFAULT, tracker?.index === index ? tracker.value : barData.data);
        })
        setCollection(new BarCollection(newItems));
      } else {
        reset();
        clearInterval(id);
      }
    }, 10);
  }

  /**
   * Reset the colors of the bars back to the default color. 
   */
  const reset = () => {
    let newItems = [...collection.getItems()];
    newItems = newItems.map((barData) => {
      return new BarData(Color.DEFAULT, barData.data);
    })
    setCollection(new BarCollection(newItems));
  }

  return (
    <React.Fragment>
      <AlgoSelector handleChange={handleAlgoChange} />
      <SortButton onClick={sort} />
      <Canvas array={collection.getItems()} />
    </React.Fragment>
  );
}

export default App;
