import React, { useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import {
    Paper,
    Button,
    Typography,
} from '@mui/material'

// import "../style/SecondExample.scss"
// type Props = {
//     movies: Item[]
// };
// {movies} : Props
const MovieCarousel = () => {
    // console.log("movies;;;;", movies)
    // return (
    //     <div style={{ marginTop: "50px", color: "#494949" }}>
    //         <Typography variant='h4'>Example: Learus Projects (random)</Typography>
    //         <br/>
    //         <Carousel
    //             className="SecondExample"
    //         >
    //             {
    //                 movies.map((movie, index) => {
    //                     return <EachMovieCard movie={movie} key={index} />
    //                 })
    //             }
    //         </Carousel>
    //         <br/>
    //     </div>
    // )
}


export type Item = {
    name: string,
    imageURL: string,
    color: string,
    href: string
}

interface ProjectProps
{
    movie: Item
}

function EachMovieCard({movie}: ProjectProps) {
    return (
        <Paper
            className="Project"
            style={{
                backgroundColor: movie.color,
            }}
            elevation={10}
        >
            <Typography variant='h5'>{movie.name}</Typography>
            <br/>
            <Typography>{movie.imageURL}</Typography>

            <Button className="CheckButton" component='a' href={movie.href} target='_blank' rel='noreferrer'>
                Check it out!
            </Button>
        </Paper>
    )
}

export default MovieCarousel;