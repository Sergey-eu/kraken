import { useEffect, RefObject } from "react";

type AnyEvent = MouseEvent | TouchEvent;

function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: AnyEvent) => void
): void {
  useEffect(() => {
    const listener = (event: AnyEvent): void => {
      const el = ref?.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener(`click`, listener);

    return (): void => {
      document.removeEventListener(`click`, listener);
    };

    // Reload only if ref or handler changes
  }, [ref, handler]);
}

export default useOnClickOutside;
