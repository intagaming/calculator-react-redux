import Display from "./ui/display";
import Keypad from "./ui/keypad";

const Calculator = () => {
  return (
    <div className="flex flex-col justify-end h-[95%] py-6 bg-black w-screen sm:w-[25rem] mx-auto my-auto rounded-3xl">
      <Display />
      <Keypad />
    </div>
  );
};

export default Calculator;
