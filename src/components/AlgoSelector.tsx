import { ChangeEvent, useState } from 'react';
import { Algorithms } from '../utils/utils';

type Props = {
  handleChange: (type: number) => void;
};

function AlgoSelector(props: Props) {

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    props.handleChange(Number(event.target.value));
  };

  return (
    <select onChange={handleChange}>
      <option value={Algorithms.SELECTION_SORT}>Selection Sort</option>
      <option value={Algorithms.INSERTION_SORT}>Insertion Sort</option>
    </select>
  )
}

export default AlgoSelector; 