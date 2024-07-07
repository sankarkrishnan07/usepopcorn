const avg = (arr) => arr.reduce((acc,cur,i,arr) => acc + cur / arr.length,0).toFixed(2);

export default function WatchedMoviesSummary({data}){
    return <div className="watched-movies__summary">
        <h2 className="watched-movies__summary-title">movies you watched</h2>
        <div className="watched-movies__summary-det">
            <span className="watched-movies__count">#️⃣ {data.length} Movies</span>
            <span className="rating__imbd">⭐ {avg(data.map(movie=>movie.imdbRating))}</span>
            <span className="rating__user">🌟 {avg(data.map(movie=>movie.userRating))}</span>
            <span className="duration">⏳ {avg(data.map(movie=>movie.runtime))} min</span>
        </div>
    </div>
}