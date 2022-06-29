import Bar from "./components/Bar";
import { useState } from "react";

// data that's going to be used for the canvas. 
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 700;
const MAX_VALUE = 10;
const BAR_WIDTH = CANVAS_WIDTH / MAX_VALUE;
const DEFAULT_COLOR = "black";

// we're going to generate an array of numbers from 1 - MAX_VALUE 
const nums: number[] = [];
for (let i = 1; i <= MAX_VALUE; ++i) {
  nums.push(i);
}

// shuffle that same array. 
for (let i = MAX_VALUE - 1; i > 0; --i) {
  const randIndex = Math.round(Math.random() * i);
  const temp = nums[i];
  nums[i] = nums[randIndex];
  nums[randIndex] = temp;
}

function App() {

  const [array, setArray] = useState(nums);

  return (
    <div>
      {array.map(num =>
        <Bar
          key={new Date().getFullYear() + Math.random() * 34}
          height={CANVAS_HEIGHT / MAX_VALUE * num}
          width={BAR_WIDTH}
          color={DEFAULT_COLOR}
          value={num}
        />)}
    </div>
  );
}

export default App;
