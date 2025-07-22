import { StarRating } from "./Star";

export function List({ watched }) {
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
