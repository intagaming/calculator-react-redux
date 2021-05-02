import { useAppDispatch, useAppSelector } from "../../store/store";
import {
  input,
  selectIsJustClear,
  selectIsJustPressOperator,
  selectPendingOperator,
} from "../../store/calculator";

type ButtonProps = {
  className?: string;
  displayString: string;
  processString: string;
};

const Button = ({ className, displayString, processString }: ButtonProps) => {
  const dispatch = useAppDispatch();
  const pendingOperator = useAppSelector(selectPendingOperator);
  const justClear = useAppSelector(selectIsJustClear);
  const justPressOperator = useAppSelector(selectIsJustPressOperator);

  let finalClass = `focus:outline-none transition rounded-full text-2xl sm:text-4xl font-medium filter active:brightness-150 ${
    className ?? ""
  }`;

  if (displayString === "0") {
    finalClass += " w-36 h-16 sm:w-44 sm:h-20";
  } else {
    finalClass += " w-16 h-16 sm:w-20 sm:h-20";
  }

  if (displayString.match("[0123456789.]")) {
    finalClass += " bg-cal-gray text-white";
  } else if (displayString.match("AC|\\+/-|%")) {
    finalClass += " bg-cal-gray-light";
    if (displayString === "AC" && !justClear) {
      displayString = "C";
    }
  } else {
    finalClass += " text-white";
    if ((justClear || justPressOperator) && pendingOperator === processString) {
      finalClass += " bg-white text-yellow-500";
    } else {
      finalClass += " bg-yellow-500";
    }
  }

  const clickHandler = () => {
    dispatch(input(processString));
  };

  return (
    <button className={finalClass} onClick={clickHandler}>
      <span className="">{displayString}</span>
    </button>
  );
};

export default Button;
