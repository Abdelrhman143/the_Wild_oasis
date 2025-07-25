import { useEffect, useRef } from "react";

export function useOutsideClick(handler) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) handler();
      }
      document.addEventListener("click", handleClick, true);
      return () => document.addEventListener("click", handleClick, true);
    },
    [handler]
  );

  return ref;
}
