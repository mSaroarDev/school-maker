import { useCallback, useEffect } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useDebounce = (
  effect: () => void,
  dependencies: any[],
  delay: number
) => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(timeout);
  }, [callback, delay]);
};
