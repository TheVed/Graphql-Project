import { useQuery, useMutation} from '@apollo/client'
import {ADD_MOVIE_MUTATION, GET_DIRECTORS_QUERY, GET_MOVIES_QUERY} from '../queries/queries'
import { useState } from 'react'



const AddMovie = () => {

    const [name, setName] = useState('')
    const [genre, setGenre] = useState('')
    const [directorID, setDirectorID] = useState('')
    
    const [addMovie] = useMutation(ADD_MOVIE_MUTATION)
    const {loading,data,error} = useQuery(GET_DIRECTORS_QUERY)
    
    const renderDirectors = () => {
        if(loading) return <option disabled>Loading...</option>
        if(error) return <option disabled>Something Went wrong</option>
        return(
            data.directors.map(director => {
                return <option key={director.id} value={director.id}>{director.name}</option>
            })
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addMovie({
            variables:{
                name:name,
                genre:genre,
                directorID:directorID
            },
            refetchQueries: [{query: GET_MOVIES_QUERY}]
        })
        console.log(name,genre,directorID)
    }
     
    return(
        <form id="add-movie" onSubmit={handleSubmit}>
            <div>
                <label htmlFor='movie-name'>Movie Name:</label>
                <input id='movie-name' name='movie-name' type="text" onChange={(e)=>setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor='genre'>Genre:</label>
                <input id='genre' name='genre' type="text" onChange={(e)=>setGenre(e.target.value)} />
            </div>
            <div>
                <label htmlFor='director'>Director:</label>
                <select id='director' name='director'onChange={(e)=>setDirectorID(e.target.value)} >
                    <option>Select a director</option>
                    {renderDirectors()}
                </select>
            </div>
            <div>
                <button type='submit'>Add new movie</button>
            </div>
        </form>
    )
}

export default AddMovie;