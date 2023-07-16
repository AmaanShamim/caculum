import React from "react";
import { ACTIONS } from "./Calculator";

export default function DigitButton({ dispatch, digit, id }) {
  return (
    <button
      id={id}
      onClick={() => dispatch({ type: ACTIONS.ADD_INPUT, payload: { digit } })}
    >
      {digit} 
    </button>
  );
}
