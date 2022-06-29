
type Props = {
  width: number;
  height: number;
  value: number;
  color: string;
}

function Bar(props: Props) {
  console.log(props);
  const styles = {
    width: props.width,
    height: props.height,
    backgroundColor: props.color,
  }
  return <div style={styles}></div>
}

export default Bar; 