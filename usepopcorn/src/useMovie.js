import { useState, useEffect } from "react";

const API_KEY = "b6371369";

export function useMovie(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dataFetchError, setDataFetchError] = useState("");

  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetch_data() {
        try {
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal },
          );

          if (!res.ok) {
            throw new Error("Something went wrong");
          }
          const data = await res?.json();
          console.log(data);
          if (data.Response === "False") {
            throw new Error("No movies found");
          }
          setDataFetchError("");
          setMovies(data.Search);
        } catch (error) {
          setDataFetchError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length <= 3) {
        setMovies([]);
        setDataFetchError("");
        return;
      }
      fetch_data();
      return function () {
        // clean up function to abort the fetch request
        controller.abort();
      };
    },
    [query],
  );
  return {
    movies: movies,
    error: dataFetchError,
    isLoading: isLoading,
  };
}
