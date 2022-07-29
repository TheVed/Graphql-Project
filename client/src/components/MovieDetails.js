import { useQuery } from "@apollo/client";
import { GET_MOVIE_QUERY } from "../queries/queries";

function MovieDetails({selectedMovie}) {
    const {loading, data, error} = useQuery(GET_MOVIE_QUERY,{
        variables: {id: selectedMovie}
    })

    const renderMovieDetails = () => {
        const {movie} = data || {}

        if(movie) {
            return(
                <div>
                    <h2>{movie.name}</h2>
                    <p>{movie.genre}</p>
                    <p>{movie.director.name}</p>
                </div>
            )
        }
        else{
            return <div><h3>Please Select a movie</h3></div>
        }
    }

    return(
        <div>
            {renderMovieDetails()}
        </div>
    )
}

export default MovieDetails