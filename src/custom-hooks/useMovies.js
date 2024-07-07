import { useEffect, useState } from "react";
const KEY = "400e268d";

export default function useMovies(search){

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(
        function () {
          const controller = new AbortController();
          async function fetchMovies() {
            try {
              setError("");
              setIsLoading(true);
              const res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${search}`,
                { signal: controller.signal }
              );
    
              if (!res.ok) throw new Error("Something went wrong");
    
              const data = await res.json();
              if (data.Response === "False") throw new Error(data.Error);
    
              setMovies(data.Search);
              setError("");
            } catch (err) {
              if (err.name !== "AbortError") setError(err.message);
            } finally {
            //   setSelectedID(null);
              setIsLoading(false);
            }
          }
    
          if (search.length < 3) {
            setMovies([]);
            setError("");
            return;
          }
    
          fetchMovies();
    
          return function () {
            controller.abort();
          };
        },
        [search]
      );

      return {isLoading,error,movies}
}