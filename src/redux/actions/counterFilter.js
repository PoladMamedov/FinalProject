import  counterFilterTypes  from "../type/counterFilter";

export function increment() {
    return { type: counterFilterTypes.INCREASE_COUNTER };
  }
  
export function decrement() {
    return { type: counterFilterTypes.DECREASE_COUNTER };
  }

export function reset() {
    return { type: counterFilterTypes.RESET_COUNTER };
  }