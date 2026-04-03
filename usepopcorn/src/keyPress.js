import { useEffect } from "react";

export function useKeyPress(targetKey, callback) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code.toLowerCase() === targetKey.toLowerCase()) {
        callback(event);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return function () {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [targetKey, callback]);
}
