import { useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
import { StarRating } from "./Star";
import { MovieDetails } from "./components/MovieDetails";
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
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

function NumbResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Mainbox({ children }) {
  return (
    <main className="main">
      <>{children}</>
    </main>
  );
}

// function MovieDetails({ movieDetails }) {
//   return movieDetails ? <h2>{movieDetails.Plot}</h2> : null;
// }

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  // const [movies, setMovies] = useState();
  // const [watched, setWatched] = useState();
  const [loading, setLoad] = useState(false);
  const [err, setErr] = useState("");
  const [query, setQuery] = useState("");
  const [id, setId] = useState("");
  const [movieDetails, setmovieDetails] = useState();

  const key = "a55fe8a0";
  const url = `https://www.omdbapi.com/?apikey=${key}&s=${query}`;

  useEffect(() => {
    async function getMoviesDetails() {
      if (id !== "") {
        const data = await fetch(
          `https://www.omdbapi.com/?apikey=${key}&i=${id}`
        );
        const details = await data.json();
        setmovieDetails(details);
      }
    }
    getMoviesDetails();
  }, [id]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setLoad(true);
        const data = await fetch(url);
        const mvs = await data.json();
        // console.log(mvs.Search);
        if (!data.ok) {
          throw new Error("Something wrong while fetching movies!!");
        }
        if (query.length > 2) {
          setMovies(mvs.Search);
        }
      } catch (error) {
        if (error) {
          console.log(error.msg);
        }
        setErr(error.msg);
      } finally {
        setLoad(false);
      }
    }

    fetchMovies();
  }, [url]);
  function handleDetail(Imdbid) {
    if (id === Imdbid) {
      setId("");
    } else {
      setId(Imdbid);
    }
  }

  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumbResult movies={movies} />
      </Navbar>

      <Mainbox>
        <Box>
          {loading && <Loading />}
          {!loading && !err && (
            <MovieList movies={movies} handleDetail={handleDetail} />
          )}
          {err && <ErrorShow err={err} />}
        </Box>

        <Box>
          {id ? (
            <MovieDetails movieDetails={movieDetails} />
          ) : (
            <>
              <Summary watched={watched} />
              <List watched={watched} />
            </>
          )}
        </Box>
      </Mainbox>
    </>
  );
}
function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
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

function List({ watched }) {
  return (
    <>
      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbID}>
            {/* {console.log(movie.Poster)} */}
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
                <span>{movie.runtime} min</span>
              </p>
            </div>
            <StarRating maxLength={10} filcolor={"red"} />
          </li>
        ))}
      </ul>
    </>
  );
}
function Loading() {
  return <h2>Loading....</h2>;
}
function ErrorShow({ err }) {
  return <h2>err.message</h2>;
}
function MovieList({ movies, handleDetail }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <li key={movie.imdbID} onClick={() => handleDetail(movie.imdbID)}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>🗓</span>
              <span>{movie.Year}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Summary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

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
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
