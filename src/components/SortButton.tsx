type Props = {
  onClick: () => void; 
}

function SortButton(props: Props) {

  const handleClick = () => {
    props.onClick(); 
  }

  return <button onClick={handleClick}>Sort</button>
}

export default SortButton; 