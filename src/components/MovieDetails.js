// export function MovieDetails({ movieDetails }) {
//   return movieDetails ? (
//     <>
//       <h2>{movieDetails.Title}</h2>
//       <img src={movieDetails.Poster} alt={`${movieDetails.Title} poster`} />
//       <p>{movieDetails.Genre}</p>
//       <p>{movieDetails.Released}</p>
//       <p>
//         <span>⭐</span>
//         {movieDetails.imdbRating}
//       </p>
//       <p>{movieDetails.Director}</p>
//       <p>{movieDetails.Actors}</p>
//       <p>{movieDetails.Language}</p>
//       <section>{movieDetails.Plot}</section>
//     </>
//   ) : null;
// }

import { useEffect } from "react";

export function MovieDetails({ movieDetails }) {
  useEffect(
    function () {
      if (movieDetails) {
        document.title = movieDetails.Title;
      }
      return function () {
        document.title = "UsePopcorn";
        // console.log(`cleaned Up ${movieDetails.Title}`);
      };
    },
    [movieDetails]
  );
  if (!movieDetails) return null;

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{movieDetails.Title}</h2>
      <img
        src={movieDetails.Poster}
        alt={`${movieDetails.Title} poster`}
        style={styles.poster}
      />

      <div style={styles.infoGrid}>
        <Info label="Genre" value={movieDetails.Genre} />
        <Info label="Released" value={movieDetails.Released} />
        <Info label="IMDb Rating" value={`⭐ ${movieDetails.imdbRating}`} />
        <Info label="Director" value={movieDetails.Director} />
        <Info label="Actors" value={movieDetails.Actors} />
        <Info label="Language" value={movieDetails.Language} />
      </div>

      <section style={styles.plot}>
        <h3>Plot</h3>
        <p>{movieDetails.Plot}</p>
      </section>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <p>
      <strong>{label}: </strong>
      {value}
    </p>
  );
}

const styles = {
  card: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "sans-serif",
    background: "#fff",
    color: "black",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  poster: {
    width: "100%",
    maxHeight: "60  0px",
    objectFit: "cover",
    marginBottom: "1rem",
    borderRadius: "8px",
  },
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    rowGap: "0.5rem",
    marginBottom: "1rem",
  },
  plot: {
    marginTop: "1rem",
    lineHeight: "1.6",
  },
};
