import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  capture: boolean = true
) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    const { signal } = ctrl;
    if (!ref.current) return;
    document.body.addEventListener(
      "click",
      (e) => {
        if (!ref.current) return;
        if (e.target instanceof Node && ref.current.contains(e.target)) return;
        handler();
      },
      { signal, capture }
    );

    return () => ctrl.abort();
  }, [handler]);
  return ref;
}
