import React from 'react';
import {
    Paper,
    Button,
    Typography,
    TextField,
    MenuItem
} from '@mui/material'

export type Movie = {
    name: string,
    imageURL: string,
    color: string,
    href: string
}

interface MovieProps {
    /** Movies array */
    movies: Movie[];

    /** Movie ratings get state */
    movieRatings: {};

    /** Movie ratings set state */
    setMovieRatings: React.Dispatch<React.SetStateAction<any>>;
}

const MovieCarousel = ({movies, movieRatings, setMovieRatings}: MovieProps) => {
    console.log("movies", movies)
    function handleSelect(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
        setMovieRatings({...movieRatings, [key]: event.target.value})
    }

    return (
        <body>
            <main id="carousel" style={{flexDirection: "row", display: "flex"}}>
            {movies.map(movie => 
                <span style={{marginRight: "20px"}} key={`${movie.name}-span`}>
                    <text>{movie.name}</text>
                    <div className="movie-card" key={movie.name} style={{width: '250px', height: '350px',marginBottom: "20px", backgroundImage: `url(${movie.imageURL})`, backgroundPosition: 'center', backgroundSize: 'cover'}}></div>
                    <label className="select-label">
                    <TextField
                        key={movie.imageURL}
                        id={movie.imageURL}
                        select
                        label="Select"
                        // defaultValue=""
                        helperText="Please select your rating"
                        variant="filled"
                        onChange={e => handleSelect(e, movie.name)}
                        value={movieRatings[movie.name as keyof typeof movieRatings]}
                    >
                        <MenuItem key="1" value="1">First</MenuItem>
                        <MenuItem key="2" value="2">Second</MenuItem>
                        <MenuItem key="3" value="3">Third</MenuItem>
                        <MenuItem key="4" value="4">Fourth</MenuItem>
                        <MenuItem key="5" value="5">Fifth</MenuItem>
                    </TextField>
                    </label>
                </span>)}
            </main>
        </body>
    )
}

export default MovieCarousel;