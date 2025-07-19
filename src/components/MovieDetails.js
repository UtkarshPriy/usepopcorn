export function MovieDetails({ movieDetails }) {
  return movieDetails ? (
    <>
      <h2>{movieDetails.Title}</h2>
      <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} />
      <p>{movieDetails.Genre}</p>
      <p>{movieDetails.Released}</p>
      <p>
        <span>⭐</span>
        {movieDetails.imdbRating}
      </p>
      <p>{movieDetails.Director}</p>
      <p>{movieDetails.Actors}</p>
      <p>{movieDetails.Language}</p>
      <section>{movieDetails.Plot}</section>
    </>
  ) : null;
}
