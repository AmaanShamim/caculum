import React from "react";
import { ACTIONS } from "./Calculator";

export default function DigitButton({ dispatch, operation, id }) {
  return (
    <button
      id={id}
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation} 
    </button>
  );
}
