import React, { FormEvent, useState } from "react";
import "./App.css";
import Carousel from 'react-material-ui-carousel';
import {
    Paper,
    Button,
    Typography,
} from '@mui/material'

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

function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [desiredValue, setDesiredValue] = useState("test");
  const [value, setValue] = useState("");
  // const [movieList, setMovieList] = useState([])
  const movieUrls = [
    "https://movie-database-alternative.p.rapidapi.com?i=tt15239678",
    "https://movie-database-alternative.p.rapidapi.com?i=tt14539740",
    "https://movie-database-alternative.p.rapidapi.com?i=tt21235248",
    "https://movie-database-alternative.p.rapidapi.com?i=tt14230458",
    "https://movie-database-alternative.p.rapidapi.com?i=tt2049403",
    "https://movie-database-alternative.p.rapidapi.com?i=tt15398776",
    "https://movie-database-alternative.p.rapidapi.com?i=tt21692408",
    "https://movie-database-alternative.p.rapidapi.com?i=tt6166392",
    "https://movie-database-alternative.p.rapidapi.com?i=tt11057302",
    "https://movie-database-alternative.p.rapidapi.com?i=tt1745960"
  ]
  const [movies, setMovies] = useState<{movies: Item[]}>()
  let movieList: Item[] = []

  function EachMovieCard(movie: Item) {
    return (
        <Paper
            className="Project"
            style={{
                // backgroundColor: movie.color,
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
  interface Props
  {
      movies: Item[]
  }
//   function MovieCarousel({movies}: MoviesProps) {
//     console.log("movies;;;;", movies)
//     // return (
//     //     <div style={{ marginTop: "50px", color: "#494949" }}>
//     //         <Typography variant='h4'>Example: Learus Projects (random)</Typography>
//     //         <br/>
//     //         <Carousel
//     //             className="SecondExample"
//     //         >
//     //             {
//     //                 movies.map((movie, index) => {
//     //                     return <EachMovieCard movie={movie} key={index} />
//     //                 })
//     //             }
//     //         </Carousel>
//     //         <br/>
//     //     </div>
//     // )
// }

class MovieCarousel extends React.Component<Props, {}> {
  render() {
    
    return movies && (
    <div style={{ height: '300px', overflowY: 'auto', width: '1000px'}}>
      {movies.movies.map(movie => <img style={{width: '250px', height: '350px'}}src={movie.imageURL} alt={movie.name}></img>)}
    </div>
    );
  }
  // render() {
  //   return 
  //     (
  //       <div style={{ marginTop: "50px", color: "#494949" }}>
  //        {/* <Typography variant='h4'>Example: Learus Projects (random)</Typography>
  //        <br/>
  //        <Carousel
  //            className="SecondExample"
  //        >
  //            {
  //                movies.map((movie, index) =><EachMovieCard movie={movie} key={index} />)
  //            }
  //        </Carousel>
  //        <br/> */}
  //       </div>
  //   )
  // }
}

  async function setContractValue() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/value`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          x: desiredValue,
        }),
      });
      const { error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      }
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
    setLoading(false);
  }

  // async function getContractValue() {
  //   setLoading(true);
  //   setErrorMsg(null);
  //   try {
  //     const res = await fetch(`/api/value`);
  //     const { x, error } = await res.json();
  //     if (!res.ok) {
  //       setErrorMsg(error);
  //     } else {
  //       setValue(x);
  //     }
  //   } catch (err: any) {
  //     setErrorMsg(err.stack);
  //   }
  //   setLoading(false);
  // }
  async function getContractValue() {
    setLoading(true);
    setErrorMsg(null);
    try {
      // const res = await fetch(`/api/value`);
      // const { x, error } = await res.json();
      // if (!res.ok) {
      //   setErrorMsg(error);
      // } else {
      //   setValue(x);
      // }
      const res = await Promise.all(movieUrls.map(e => fetch(e, {
        method: "GET",
        headers: { 
          'X-RapidAPI-Key': '80ea1982d5msh094b5a03b6ce240p152960jsn3d7f5f682b43',
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
          "Content-Type": "application/json" 
        }
      })));

      let resJson = await Promise.all(res.map(e => e.json()))
      console.log("resJson ---> ", resJson);
      for (const each of resJson) {
        const movieData = {name: each.Title, imageURL: each.Poster} as Item
        movieList.push(movieData)
      }
      setMovies({movies: movieList})
      // console.log("movielist", movieList)
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
    setLoading(false);
  }


  function handleChange(event: FormEvent<HTMLInputElement>) {
    setDesiredValue(event.currentTarget.value);
  }

  console.log("movieList", movies)
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <input className="App-input" onChange={handleChange} />
          <button
            type="button"
            className="App-button"
            onClick={setContractValue}
          >
            Set Value
          </button>
        </p>
        <MovieCarousel movies={movieList} />
        <p>
          <button
            type="button"
            className="App-button"
            onClick={getContractValue}
          >
            Get Value
          </button>
          {value !== "" ? <p>Retrieved value: {value}</p> : <p>&nbsp;</p>}
        </p>
        {errorMsg && <pre className="App-error">Error: {errorMsg}</pre>}
      </header>
    </div>
  );
}

export default App;
