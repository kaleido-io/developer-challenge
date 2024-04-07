import React, { FormEvent, useState, useEffect } from "react";
import "./App.css";
import "./App.scss";
import {TextField, Box, MenuItem, Button} from '@mui/material';
import NewUserRegisterModal from './NewUserModal';

export type Item = {
  name: string,
  imageURL: string,
  color: string,
  href: string
}

function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [desiredValue, setDesiredValue] = useState("test");
  const [value, setValue] = useState("");
  const movieUrls = [
    "https://movie-database-alternative.p.rapidapi.com?i=tt15239678",
    "https://movie-database-alternative.p.rapidapi.com?i=tt11057302",
    "https://movie-database-alternative.p.rapidapi.com?i=tt21235248",
    "https://movie-database-alternative.p.rapidapi.com?i=tt14230458",
    "https://movie-database-alternative.p.rapidapi.com?i=tt2049403",
  ]
  const [movies, setMovies] = useState<{movies: Item[]}>()
  let movieList: Item[] = []
  const [movieRatings, setMovieRatings] = useState({})
  const [emailAddress, setEmailAddress] = useState('')
  const [newUserEmailAddress, setNewUserEmailAddress] = useState('');


  // modal props
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  // to handle when user select a rating - save to an object with key(movie name)-value(selected rating) pair
  function handleSelect(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
    setMovieRatings({...movieRatings, [key]: event.target.value})
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEmailAddress(event.target.value)
  }

  async function handleSubmit() {
    const res = await fetch('/api/userTransactions');
    const allowedUsers = await res.json();
      if (!res.ok) {
        // setErrorMsg(error);
      } else { // if user is found then let them rate movies
        if(allowedUsers.find((allowedUser: any) => allowedUser.emailAddress === emailAddress)) {
          fetchMovies()
        } else { // if user is not found
          // set error
        }
      }
  }

  async function submitRatings() {
    console.log("in submit", movieRatings)
    // TODO: call setMovieRating here!!!

    // const res = await fetch('/api/setMovieRating');
    // const { data, error } = await res.json();
    //   if (!res.ok) {
    //     // setErrorMsg(error);
    //   } else {
    //     console.log("data from mongo ---", data)
    //   }
  }

  interface Props
  {
      movies: Item[]
  }

// Render movie posters + titles + select options
class MovieCarousel extends React.Component<Props, {}> {
  render() {
    return movies && (
      <body>
        <main id="carousel" style={{flexDirection: "row", display: "flex"}}>
          {movies.movies.map(movie => 
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
    );
  }
}

  async function fetchMovies() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await Promise.all(movieUrls.map(e => fetch(e, {
        method: "GET",
        headers: { 
          'X-RapidAPI-Key': '80ea1982d5msh094b5a03b6ce240p152960jsn3d7f5f682b43',
          'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com',
          "Content-Type": "application/json" 
        }
      })));

      let resJson = await Promise.all(res.map(e => e.json()))
      for (const each of resJson) {
        const movieData = {name: each.Title, imageURL: each.Poster} as Item
        movieList.push(movieData)
      }

      setMovies({movies: movieList})
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
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
      const res = await fetch(`/api/value`);
      const { x, error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      } else {
        setValue(x);
      }
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
    setLoading(false);
  }


  function handleChange(event: FormEvent<HTMLInputElement>) {
    setDesiredValue(event.currentTarget.value);
  }

  // event: React.MouseEvent<HTMLButtonElement, MouseEvent>, text: string
  return (
    <div className="App">
      <header className="App-header">
        <h1><img src="../images/movie-icon-2.png" alt="movie-icon" style={{width: '50px'}}/>ReelRater</h1>
        <br />
        {!movies && 
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              sx={{width: '300px', marginBottom: '20px'}}
              error={emailAddress === ''}
              id="outlined-error"
              label="Email Address"
              value={emailAddress}
              onChange={handleInput}
              helperText={!emailAddress && "Please enter email address to continue rating movies"}
            />
            <br/>
            <Button 
              sx={{
                borderColor: "black",
                color: "black"
              }}
              variant="outlined"
              disabled={emailAddress === ''}
              onClick={handleSubmit}
            >
              Start Rating!
            </Button>
          </Box>
        }
        <MovieCarousel movies={movieList} />
        {
          movies && (
            <>
              <br/>
              <p>
              {/* <input className="App-input" onChange={handleChange} /> */}
                <Button
                  type="button"
                  className="submit-button"
                  onClick={submitRatings}
                  variant="outlined"
                >
                  Submit Ratings
                </Button>
              </p>
            </>
          )
        }
        {/* <p>
          <button
            type="button"
            className="App-button"
            onClick={getContractValue}
          >
            Get Value
          </button>
          {value !== "" ? <p>Retrieved value: {value}</p> : <p>&nbsp;</p>}
        </p> */}
        <br />
        <p style={{fontSize: '14px', fontFamily: 'monospace', color: 'black'}}>
          If new user, please register first: {'   '}
          <Button
            type="button"
            className="submit-button"
            onClick={handleOpen}
            variant="contained"
            sx={{backgroundColor: 'darksalmon'}}
          >
            Register as New User
          </Button>
          <NewUserRegisterModal 
            title="User Registration Information:" 
            newUserEmailAddress={newUserEmailAddress}
            setNewUserEmailAddress={setNewUserEmailAddress}
            openModal={openModal}
            handleClose={handleClose} 
          />
        </p>
        {errorMsg && <pre className="App-error">Error: {errorMsg}</pre>}
      </header>
    </div>
  );
}

export default App;
