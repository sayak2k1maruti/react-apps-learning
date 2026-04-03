import { useState, useEffect, useRef } from "react";
import { useKeyPress } from "./keyPress";
import { useLocalStorage } from "./localStorage";
import StarRating from "./StarRating";
import { useMovie } from "./useMovie";
const API_KEY = "b6371369";
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [watchedMovies, setWatchedMovies] = useLocalStorage([], "watched");

  function handleSelectedMovieClose() {
    setSelectedMovieId("");
  }
  function handleAddToWatchedMovie(movie) {
    setWatchedMovies([...watchedMovies, movie]);
  }
  function handleDeleteFromWatched(id) {
    setWatchedMovies(watchedMovies.filter((m) => m.imdbID !== id));
  }

  const { movies, isLoading, error } = useMovie(
    query,
    handleSelectedMovieClose,
  );

  return (
    <>
      <NavBar>
        <SearchBar query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {!query && (
            <ErrorMessage>Start by searching for a movie...</ErrorMessage>
          )}
          {query && isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onMovieSelect={setSelectedMovieId} />
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Box>
        <Box>
          {selectedMovieId ? (
            <MovieDetails
              id={selectedMovieId}
              onClose={handleSelectedMovieClose}
              watchedMovies={watchedMovies}
              onAddToWatched={handleAddToWatchedMovie}
            />
          ) : (
            <>
              <WatchedSummery watched={watchedMovies} />
              <WatchedList
                watched={watchedMovies}
                onDeleteWatchedMovie={handleDeleteFromWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ children }) {
  return <p className="error">{children}</p>;
}

function SearchBar({ query, setQuery }) {
  const searchIn = useRef(null);
  useEffect(function () {
    searchIn.current.focus();
    // document.addEventListener("keydown", callback);
  }, []);

  useKeyPress("Slash", function (e) {
    if (document.activeElement !== searchIn.current) {
      searchIn.current.focus();
      searchIn.current.select();
      e.preventDefault();
    }
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchIn}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function Movie({ movie, onSelect }) {
  return (
    <li key={movie.imdbID} onClick={onSelect}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieList({ movies, onMovieSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelect={() => onMovieSelect(movie.imdbID)}
        />
      ))}
    </ul>
  );
}

function MovieDetails({ id, onClose, watchedMovies = [], onAddToWatched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);

  const watchedMovie = watchedMovies.find((m) => m.imdbID === id); //If this movie is watched, find it in the watchedMovies array
  const isThisWatched = !!watchedMovie;
  const watchedUserRating = watchedMovie?.userRating;

  const {
    Title: title,
    // Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie: ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title],
  );

  useEffect(
    function () {
      async function fetchMovieDetals() {
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?i=${id}&apiKey=${API_KEY}`,
          );
          const data = await res.json();
          setMovie(data);
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false);
      }

      fetchMovieDetals();
    },
    [id],
  );
  function handleAddToWatched() {
    onAddToWatched({
      imdbID: movie?.imdbID,
      Title: movie?.Title,
      Year: movie?.Year,
      Poster: movie?.Poster,
      runtime: movie?.Runtime,
      imdbRating: movie?.imdbRating,
      userRating: userRating,
    });
  }

  useKeyPress("Escape", onClose);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {isThisWatched ? (
                <p>You rated this movie {watchedUserRating} ⭐️</p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    height={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddToWatched}>
                      + Add to Watched List
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function WatchedSummery({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => parseInt(movie.runtime)));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime}</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ movie, onDelete }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
      </div>
      <button className="btn-delete" onClick={onDelete}>
        X
      </button>
    </li>
  );
}

function WatchedList({ watched, onDeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDelete={() => onDeleteWatchedMovie(movie.imdbID)}
        />
      ))}
    </ul>
  );
}
