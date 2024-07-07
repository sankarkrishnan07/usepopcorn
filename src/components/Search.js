import { useRef } from "react";
import useKey from "../custom-hooks/useKey";


export default function Search({ search, results, setSearch }) {

  const inputEl = useRef(null);

  useKey("Enter", ()=>{
    if (document.activeElement===inputEl.current) return;
        inputEl.current.focus();
        setSearch("");
  })
    
    // search.length > 3 && setSearch(search)

    function handleSubmit(e){
        e.preventDefault();
    }
 
  return (
    <>
      <form onSubmit={handleSubmit} className="search-movies">
        <input
          type="text"
          name="search-movies"
          id="search-movies"
          placeholder="Search movies..."
          className="search-box"
          value={search}
          onChange={e=>setSearch(e.target.value)}
          ref={inputEl}
        />
      </form>
      <p className="search-results">Found {results} results</p>
    </>
  );
}
