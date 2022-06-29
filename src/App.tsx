import AppData from "./utils/utils";
import React, { useState } from "react";
import Canvas from "./components/Canvas";

// data that's going to be used for the canvas. 


// we're going to generate an array of numbers from 1 - MAX_VALUE 
const nums: number[] = [];
for (let i = 1; i <= AppData.MAX_VALUE; ++i) {
  nums.push(i);
}

// shuffle that same array. 
for (let i = AppData.MAX_VALUE - 1; i > 0; --i) {
  const randIndex = Math.round(Math.random() * i);
  const temp = nums[i];
  nums[i] = nums[randIndex];
  nums[randIndex] = temp;
}

function App() {

  const [array, setArray] = useState(nums);

  return (
    <React.Fragment>
      <Canvas array={array} />
    </React.Fragment>
  );
}

export default App;
