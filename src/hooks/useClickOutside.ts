import { useEffect, useRef } from "react";

export function useClickOutside<T extends HTMLElement>(handler: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    const { signal } = ctrl;
    document.body.addEventListener(
      "click",
      (e) => {
        if (!ref.current) return;
        if (e.target instanceof Node && ref.current.contains(e.target)) return;
        console.log("Click outside");
        handler();
      },
      { signal, capture: true }
    );

    return () => ctrl.abort();
  }, [handler]);
  return ref;
}
