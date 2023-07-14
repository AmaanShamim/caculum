import React from "react";
import { ACTIONS } from "./Calculator";

export default function DigitButton({ dispatch, operation }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
    >
      {operation} 
    </button>
  );
}
