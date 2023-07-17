import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_INPUT: "add-input",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE: "delete",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_INPUT:
      if (state.overwrite) {
        return {
          ...state,
          currentValue: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentValue === "0") return state;
      if (payload.digit == '.' && state.currentValue == null){
        return {
          ...state,
          currentValue: `0${payload.digit}`,
        }
      }
      if (payload.digit === "." && state.currentValue.includes("."))
        return state;
      return {
        ...state,
        currentValue: `${state.currentValue || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentValue == null && state.previousValue == null && payload.operation == '-')
        return {
          ...state,
          currentValue: payload.operation
      }
      if (state.currentValue==null&&state.operation!=null&&state.previousValue!=null&&payload.operation=='-'){
        return {
          ...state,
          currentValue: payload.operation
        }
      }
      if (state.currentValue == null && state.previousValue == null)
        return state;
      if (state.previousValue == null) {
        return {
          ...state,
          operation: payload.operation,
          previousValue: state.currentValue,
          currentValue: null,
        };
      }
      if (state.currentValue == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousValue: evaluate(state),
        operation: payload.operation,
        currentValue: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EVALUATE:
      if (
        state.currentValue === null ||
        state.previousValue === null ||
        state.operation === null
      )
        return state;
      return {
        ...state,
        overwrite: true,
        previousValue: null,
        operation: null,
        currentValue: evaluate(state),
      };
    case ACTIONS.DELETE:
      if (state.currentValue === null || state.currentValue === undefined)
        return state;
      if (state.currentValue.length === 1)
        return {
          ...state,
          currentValue: null,
        };
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentValue: null,
        };
      }
      return {
        ...state,
        currentValue: state.currentValue.slice(0, -1),
      };
  }
}

function evaluate({ currentValue, previousValue, operation }) {
  const previous = parseFloat(previousValue);
  const current = parseFloat(currentValue);
  if (isNaN(previous) || isNaN(current)) return "";
  let result = "";
  switch (operation) {
    case "÷":
      result = previous / current;
      break;
    case "*":
      result = previous * current;
      break;
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
  }
  return result.toString();
}

// const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
//   maximumFractionDigits: 0,
// });
// function formatter(value) {
//   if (value == null) return "";
//   const [interger, decimal] = value.split(".");
//   if (decimal == null) return INTEGER_FORMATTER.format(interger);
//   return `${INTEGER_FORMATTER.format(interger)}.${decimal}`;
// }

export default function Calculator() {
  const [{ currentValue='0', previousValue, operation }, dispatch] =
    useReducer(reducer, {});

  return (
    <div className="calculator-grid">
      <div id="display" className="output">
        <div className="previous-value">
          {previousValue} {operation}
        </div>
        <div className="current-value">{currentValue}</div>
      </div>
      <button
        id="clear"
        className="two-span"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE })}>DEL</button>
      <OperationButton id="divide" operation="÷" dispatch={dispatch} />
      <DigitButton id="one" digit="1" dispatch={dispatch} />
      <DigitButton id="two" digit="2" dispatch={dispatch} />
      <DigitButton id="three" digit="3" dispatch={dispatch} />
      <OperationButton id="multiply" operation="*" dispatch={dispatch} />
      <DigitButton id="four" digit="4" dispatch={dispatch} />
      <DigitButton id="five" digit="5" dispatch={dispatch} />
      <DigitButton id="six" digit="6" dispatch={dispatch} />
      <OperationButton id="add" operation="+" dispatch={dispatch} />
      <DigitButton id="seven" digit="7" dispatch={dispatch} />
      <DigitButton id="eight" digit="8" dispatch={dispatch} />
      <DigitButton id="nine" digit="9" dispatch={dispatch} />
      <OperationButton id="subtract" operation="-" dispatch={dispatch} />
      <DigitButton id="decimal" digit="." dispatch={dispatch} />
      <DigitButton id="zero" digit="0" dispatch={dispatch} />
      <button
        id="equals"
        className="two-span"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

// 13. If 2 or more operators are entered consecutively, the operation performed should be the last operator entered (excluding the negative (-) sign.

// The sequence "5 * - 5" = should produce an output of "-25" : expected '0' to equal '-25'
// AssertionError: The sequence "5 * - 5" = should produce an output of "-25" : expected '0' to equal '-25'
