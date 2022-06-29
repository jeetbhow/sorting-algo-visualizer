import "../styles/Bar.css";

type Props = {
  width: number;
  height: number;
  value: number;
  color: string;
}

function Bar(props: Props) {
  const styles = {
    width: props.width + "px",
    height: props.height + "px",
    backgroundColor: props.color,
  }
  return <div className="bar" style={styles}></div>
}

export default Bar; 