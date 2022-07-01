type Props = {
  onClick: () => void;
}

function RandomizeButton(props: Props) {
  return <button onClick={props.onClick}>Randomize</button>
}

export default RandomizeButton; 