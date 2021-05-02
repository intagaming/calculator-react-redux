import Button from "./button";
import KeypadRow from "./keypadRow";

const Keypad = () => {
  return (
    <div className="mx-auto flex flex-col space-y-4">
      <KeypadRow>
        <Button displayString="AC" processString="C" />
        <Button displayString="+/-" processString="+/-" />
        <Button displayString="%" processString="%" />
        <Button displayString="/" processString="/" />
      </KeypadRow>

      <KeypadRow>
        <Button displayString="7" processString="7" />
        <Button displayString="8" processString="8" />
        <Button displayString="9" processString="9" />
        <Button displayString="X" processString="*" />
      </KeypadRow>

      <KeypadRow>
        <Button displayString="4" processString="4" />
        <Button displayString="5" processString="5" />
        <Button displayString="6" processString="6" />
        <Button displayString="-" processString="-" />
      </KeypadRow>

      <KeypadRow>
        <Button displayString="1" processString="1" />
        <Button displayString="2" processString="2" />
        <Button displayString="3" processString="3" />
        <Button displayString="+" processString="+" />
      </KeypadRow>

      <KeypadRow>
        <Button displayString="0" processString="0" />
        <Button displayString="." processString="." />
        <Button displayString="=" processString="=" />
      </KeypadRow>
    </div>
  );
};

export default Keypad;
