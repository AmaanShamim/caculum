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
        if(payload.digit==='0'&&state.currentValue==='0') return state
        if(payload.digit==='.'&&state.currentValue.includes('.')) return state
      return {
        ...state,
        currentValue: `${state.currentValue || ''}${payload.digit}`,
      }
    case ACTIONS.CHOOSE_OPERATION:
        if(state.currentValue===null&&state.previousValue===null) return state
        if(state.previousValue==null){
            return{
                ...state,
                operation: payload.operation,
                previousValue: state.currentValue,
                currentValue: null
            }
        }
        if(state.currentValue===null){
            return{
                ...state,
                operation: payload.operation
            }
        }
        return {
            ...state,
            previousValue: evaluate(state),
            operation: payload.operation,
            currentValue: null
        }
    case ACTIONS.CLEAR:
        return {}
    case ACTIONS.EVALUATE:
        if(state.currentValue===null||state.previousValue===null||state.operation===null) return state
        return{
            ...state,
            previousValue: null,
            operation: null,
            currentValue: evaluate(state)
        }
  }
}

function evaluate({currentValue, previousValue , operation}) {
    const previous = parseFloat(previousValue)
    const current = parseFloat(currentValue)
    if (isNaN(previous) || isNaN(current)) return ""
    let result = ''
    switch (operation) {
        case '÷':
            result = previous / current
            break;
        case '*':
            result = previous * current
            break;
        case '+':
            result = previous + current
            break;
        case '-':
            result = previous - current
            break;
    }
    return result.toString()
}

export default function Calculator() {
  const [{ currentValue, previousValue, operation }, dispatch] = useReducer(
    reducer,
    {}
  )
  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-value">
          {previousValue} {operation}
        </div>
        <div className="current-value">{currentValue}</div>
      </div>
      <button className="two-span" onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
      <OperationButton operation='÷' dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation='*' dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation='+' dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation='-' dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="two-span" onClick={()=>dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}
