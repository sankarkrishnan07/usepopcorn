export default function MoviesList({data,watchedList,setSelectedID,watchedMovies, setWatchedMovies}){

    function handleDeleteWatched(e,id){
        e.stopPropagation();
        setWatchedMovies(watchedMovies.filter(movie=>movie.imdbID!==id))
    }

    function handleSetSelected(id){
        setSelectedID(id)
    }

    return <ul className="movies__list">
        {data.map(movie => <MovieItem key={movie.imdbID} data={movie} watchedList={watchedList} handleDeleteWatched={handleDeleteWatched} handleSetSelected={handleSetSelected}/>) }
    </ul>
}

function MovieItem({data,watchedList,handleDeleteWatched,handleSetSelected}){
    return <li className="movie__wrap" onClick={()=>handleSetSelected(data.imdbID)}>
        <div className="movie-img">
        <img src={data.Poster} alt={data.Title} />
        </div>
        <div className="movie">
            <h3 className="movie-title">{data.Title}</h3>
            {watchedList ? <div className="watched-movies__summary-det">
            <span className="rating__imbd">⭐ {data.imdbRating}</span>
            <span className="rating__user">🌟 {data.userRating}</span>
            <span className="duration">⏳ {data.runtime} min</span>
        </div> : <div className="movie-det">
                <span className="movie-year">📆{data.Year}</span>
            </div>}
        </div>
        {watchedList && <button className="del-watched" onClick={(e)=>handleDeleteWatched(e,data.imdbID)}>X</button>}
    </li>
}