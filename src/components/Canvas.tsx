import { AppData } from "../utils/utils";
import Bar from "./Bar";
import "../styles/Canvas.css";
import BarData from "../model/BarData";

const BAR_WIDTH = AppData.CANVAS_WIDTH / AppData.MAX_VALUE;

type Props = {
  array: BarData[],
}

function Canvas(props: Props) {

  const styles = {
    width: AppData.CANVAS_WIDTH,
    height: AppData.CANVAS_HEIGHT,
  };

  return (
    <div style={styles} className="canvas">
      {props.array.map(barData =>
        <Bar
          key={new Date().getFullYear() + Math.random() * 34}
          height={AppData.CANVAS_HEIGHT / AppData.MAX_VALUE * barData.data}
          width={BAR_WIDTH}
          color={barData.color}
        />)}
    </div>
  );
}

export default Canvas; 