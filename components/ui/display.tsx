import { useAppSelector } from "../../store/store";
import { selectDisplay } from "../../store/calculator";

const Display = () => {
  const display = useAppSelector(selectDisplay);

  let style = "text-8xl";

  if (display.length === 9) {
    style = "text-5xl";
  } else if (display.length === 8) {
    style = "text-6xl";
  } else if (display.length === 7) {
    style = "text-7xl";
  }

  return (
    <div className="relative pt-20 w-80 sm:w-96 mx-auto text-right px-3 mb-8 text-white font-light">
      <span className="text-white font-mono p-4 absolute top-0 left-0 text-sm">
        An Hoang - 2021
      </span>
      <span className={style}>{display}</span>
    </div>
  );
};

export default Display;
