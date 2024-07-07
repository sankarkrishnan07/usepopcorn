import { useState } from "react";
import "./App.scss";
import Logo from "./components/Logo";
import Container from "./components/Container";
import MoviesList from "./components/MoviesList";
import Search from "./components/Search";
import WatchedMoviesSummary from "./components/WatchedMoviesSummary";
import ErrorMessage from "./components/ErrorMessage";
import Loader from "./components/Loader";
import SelectedMovieDetails from "./components/SelectedMovieDetails";
import useMovies from "./custom-hooks/useMovies";
import useLocalStorageState from "./custom-hooks/useLocalStorageState";

// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY = "400e268d";

function App() {
  const [search, setSearch] = useState("");
  // const [movies, setMovies] = useState([]);

  // const [watchedMovies, setWatchedMovies] = useState([]);

  const [watchedMovies, setWatchedMovies] = useLocalStorageState([],"watchedMovies");
 
  // const [error, setError] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const [selectedID, setSelectedID] = useState(null);

  const {isLoading,error,movies} = useMovies(search);

  return (
    <div className="contianer">
      <div className="header">
        <Logo />
        <Search
          search={search}
          results={movies?.length}
          setSearch={setSearch}
        />
      </div>
      <div className="main">
        <Container>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              data={movies}
              setSelectedID={setSelectedID}
            />
          )}
          {error && <ErrorMessage>⛔{error}</ErrorMessage>}
        </Container>
        <Container>
          
          {selectedID ? (
            <SelectedMovieDetails selectedID={selectedID} setSelectedID={setSelectedID} apikey={KEY} watchedMovies={watchedMovies} setWatchedMovies={setWatchedMovies} key={selectedID} />
          ) : (
            <>
            <WatchedMoviesSummary data={watchedMovies} />
            <MoviesList data={watchedMovies} watchedList={true} watchedMovies={watchedMovies} setWatchedMovies={setWatchedMovies} setSelectedID={setSelectedID} />
            </>
          )}
        </Container>
      </div>
    </div>
  );
}

export default App;
