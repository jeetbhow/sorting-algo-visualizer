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

// Reducer that changes the current SortingAlgorithm settings. 
const algorithmReducer = (state: SortingAlgorithm, action: number) => {
  switch (action) {
    case Algorithms.INSERTION_SORT:
      return new SortingAlgorithm(insertionSort(state.next().value.data));
    default:
      return new SortingAlgorithm(selectionSort(state.next().value.data));
  }
}

function App() {
  const [currAlgo, setCurrAlgo] = useState(Algorithms.SELECTION_SORT);
  const [collection, setCollection] = useState(initialCollection);
  const [algorithm, dispatchAlgorithm] = useReducer(algorithmReducer, initialAlgorithm);

  const handleAlgoChange = (type: number) => {
    setCurrAlgo(type);
    dispatchAlgorithm(type);
  };

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
        clearInterval(id);
      }
    }, 50);
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
