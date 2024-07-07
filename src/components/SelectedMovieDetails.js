import { useEffect, useRef, useState } from "react";
import Loader from "./Loader";
import StarRating from "./StarRating";
import useKey from "../custom-hooks/useKey";

export default function SelectedMovieDetails({
  selectedID,
  setSelectedID,
  apikey,
  watchedMovies,
  setWatchedMovies,
}) {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  let ratingCount = useRef(0);

  const isWatched = watchedMovies
    .map((movie) => movie.imdbID)
    .includes(selectedID);
  const userRated = watchedMovies.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  function handleSetWatched(movie) {
    const newWatchedMovie = {
      imdbID: movie.imdbID,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      runtime: Number(movie.Runtime.split(" ").at(0)),
      imdbRating: Number(movie.imdbRating),
      userRating,
      ratingCount:ratingCount.current
    };
    setWatchedMovies([...watchedMovies, newWatchedMovie]);
    setSelectedID(null);
  }

  useEffect(
    function () {
      setIsLoading(true);
      async function fetchSelectedMovie() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${apikey}&i=${selectedID}`
        );
        const data = await res.json();
        setSelectedMovie(data);
        setIsLoading(false);
      }
      fetchSelectedMovie();
    },
    [selectedID, apikey]
  );

  useEffect(
    function () {
      if (!selectedMovie.Title) return;
      document.title = `Movie | ${selectedMovie.Title}`;

      return function () {
        document.title = "usePopcorn 🍿";
      };
    },
    [selectedMovie.Title]
  );

  useKey("Escape", ()=>setSelectedID(null))

  useEffect(function(){
    if (userRating) ratingCount.current++;
  },[userRating])

  return isLoading ? (
    <Loader />
  ) : (
    <div className="movie-container">
      <button className="return-back" onClick={() => setSelectedID(null)}>
        &larr;
      </button>
      <div className="movie__full-wrap">
        <img src={selectedMovie.Poster} alt="" />
        <div className="movie__full-details">
          <h2 className="movie-name">{selectedMovie.Title}</h2>
          <p className="release-runtime">
            {selectedMovie.Released} . {selectedMovie.Runtime}
          </p>
          <p className="genre">{selectedMovie.Genre}</p>
          <p className="imdb-rating">
            ⭐ {selectedMovie.imdbRating} IMDB rating
          </p>
        </div>
      </div>
      <div className="movie__add-watched">
        {isWatched ? (
          <p className="movie-rated"> You rated {userRated}🌟 for this movie</p>
        ) : (
          <>
            <StarRating bgColor="#212529" onSetRating={setUserRating} />
            {userRating > 0 && (
              <button
                className="btn__add-watched"
                onClick={() => handleSetWatched(selectedMovie)}
              >
                Add to Watched List
              </button>
            )}
          </>
        )}
      </div>
      <div className="movie__full-plot">{selectedMovie.Plot}</div>
    </div>
  );
}
