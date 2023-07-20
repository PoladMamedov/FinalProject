import { useEffect } from "react";
import useTimeout from "./useTimeout";

function useFuncDebounce(callback, delay, dependencies) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}

// eslint-disable-next-line import/prefer-default-export
export { useFuncDebounce };
