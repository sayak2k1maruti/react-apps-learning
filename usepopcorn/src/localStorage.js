import { useState, useEffect } from "react";

export function useLocalStorage(initialValue, key) {
  const [value, setValue] = useState(function () {
    const storedWatchedMovies = JSON.parse(localStorage.getItem(key));
    return storedWatchedMovies || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
