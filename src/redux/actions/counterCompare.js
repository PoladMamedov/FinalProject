import counterCompareTypes from "../type/counterCompare";

export function incrementCompare() {
    return { type: counterCompareTypes.INCREASE_COMPARE_COUNTER };
  }
  
export function decrementCompare() {
    return { type: counterCompareTypes.DECREASE_COMPARE_COUNTER };
  }

export function resetCompare() {
    return { type: counterCompareTypes.RESET_COMPARE_COUNTER };
  }
