import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type CalculatorState = {
  display: string; // No additional points here, just number and decimal point
  internal: number;
  stack: string[];
  processed: boolean;
  justClear: boolean;
  justPressOperator: boolean;
  dotted: boolean;
};

const initialState: CalculatorState = {
  display: "0",
  internal: 0,
  stack: [],
  processed: true,
  justClear: true,
  justPressOperator: false,
  dotted: false,
};

const appendInput = (current: string, input: string): string => {
  if (Number.isNaN(input)) {
    return current;
  }

  if (current === "0" || current === "-0") {
    if (input === "0") {
      // If already 0 and input 0
      return current;
    }
    return (current === "-0" ? "-" : "") + input;
  }

  if (current.length === 9) {
    // Max 9 digit
    return current;
  }

  return current + input;
};

const calculate = (operator: string, a: number, b: number): number => {
  let result;

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      result = a / b;
      break;
    default:
      throw new Error("Calculation invalid.");
  }

  return result;
};

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    input(state, action: PayloadAction<string>) {
      const input = action.payload;

      // Display function
      const display = () => {
        if (state.internal === Infinity) {
          state.display = "Error";
          return;
        }
        if (Object.is(state.internal, -0)) {
          state.display = "-0";
        } else {
          state.display = state.internal.toString();
        }
        state.display = new Intl.NumberFormat().format(+state.display);
        if (state.dotted) {
          state.display = state.display + ".";
        }
      };

      // Process the calculation
      const processCalculation = () => {
        if (state.stack.length != 2) {
          throw new Error();
        }
        const result = calculate(
          state.stack[1],
          +state.stack[0],
          state.internal
        );
        state.stack[0] = result.toString();
        // display();
        state.display = state.stack[0];
        state.processed = true;
      };

      // Calculate on the current displaying value
      const calculationOnDisplay = (operator: string, operand: number) => {
        state.internal = calculate(operator, state.internal, operand);
        display();
      };

      // Press key 0 -> 9
      if (input.match("^[0123456789]$")) {
        let current = Object.is(state.internal, -0)
          ? "-0"
          : state.internal.toString();
        if (state.dotted && current.indexOf(".") === -1) {
          current += ".";
        }
        const result = appendInput(current, input);
        state.display = result;
        state.internal = +result;
        state.processed = false;
        state.justClear = false;
        state.justPressOperator = false;
        // if (state.holdingOperator) {
        //   state.holdingOperator = null;
        // }
        return;
      }

      // Check if it is an operator
      const operatorsMatch = "^[+\\-*/]$";
      if (input.match(operatorsMatch)) {
        // Check if previously inputted another operator
        if (state.stack.length === 2 && state.stack[1].match(operatorsMatch)) {
          // Check if current value is changed (another value is inputted since the last operator)
          if (state.internal.toString() === state.stack[0]) {
            // Change the operator only
            state.stack[1] = input;
            // state.holdingOperator = input;
            state.justPressOperator = true;
            return;
          }
          // Process the calculation
          if (!state.processed) {
            processCalculation();
          }
          // ... now, wait for the new operator to be inputted
        }
        if (!state.processed) {
          state.stack[0] = state.internal.toString();
        } else if (state.stack[0] === undefined) {
          state.stack[0] = "0";
        }
        state.stack[1] = input;
        state.internal = 0;
        // state.holdingOperator = input;
        state.justPressOperator = true;
        state.dotted = false;
        return;
      }

      switch (input) {
        case "=":
          if (input === "=") {
            if (state.stack.length === 2) {
              processCalculation();
            }
            return;
          }
          break;
        case "+/-":
          if (input === "+/-") {
            if (Object.is(state.internal, 0)) {
              state.internal = -0;
              display();
              return;
            }
            calculationOnDisplay("*", -1);
            return;
          }
          break;
        case "%":
          if (input === "%") {
            calculationOnDisplay("/", 100);
            return;
          }
          break;
        case ".":
          if (input === "." && !state.dotted) {
            state.dotted = true;
            display();
          }
          break;
        case "C":
          if (input === "C") {
            if (state.justClear) {
              state.stack = [];
              state.processed = true;
            } else {
              state.justClear = true;
            }
            state.display = "0";
            state.internal = 0;
            state.dotted = false;
            return;
          }
          break;
      }
    },
  },
});

export const { input } = calculatorSlice.actions;

export const selectDisplay = (state: RootState) => state.calculator.display;

export const selectPendingOperator = (state: RootState): string | undefined =>
  state.calculator.stack[1];

export const selectIsJustClear = (state: RootState) =>
  state.calculator.justClear;

export const selectIsJustPressOperator = (state: RootState) =>
  state.calculator.justPressOperator;

export default calculatorSlice.reducer;
