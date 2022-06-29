import AppData from "../utils/utils";
import Bar from "./Bar";
import "../styles/Canvas.css";

const BAR_WIDTH = AppData.CANVAS_WIDTH / AppData.MAX_VALUE;

type Props = {
  array: number[],
}

function Canvas(props: Props) {

  const styles = {
    width: AppData.CANVAS_WIDTH,
    height: AppData.CANVAS_HEIGHT,
  };

  return (
    <div style={styles} className="canvas">
      {props.array.map(num =>
        <Bar
          key={new Date().getFullYear() + Math.random() * 34}
          height={AppData.CANVAS_HEIGHT / AppData.MAX_VALUE * num}
          width={BAR_WIDTH}
          color={AppData.DEFAULT_COLOR}
          value={num}
        />)}
    </div>
  );
}

export default Canvas; 