import React, { useState } from "react";
import "./App.css";
import "./App.scss";
import {TextField, Box, MenuItem, Button, Alert} from '@mui/material';
import NewUserRegisterModal from './NewUserModal';
import {ASCIItoHEX} from './StringHexConverter';

export type Item = {
  name: string,
  imageURL: string,
  color: string,
  href: string
}

function App() {
  const [errorMsg, setErrorMsg] = useState<string>();
  const movieUrls = [
    "https://movie-database-alternative.p.rapidapi.com?i=tt15239678",
    "https://movie-database-alternative.p.rapidapi.com?i=tt11057302",
    "https://movie-database-alternative.p.rapidapi.com?i=tt21235248",
    "https://movie-database-alternative.p.rapidapi.com?i=tt14230458",
    "https://movie-database-alternative.p.rapidapi.com?i=tt2049403",
  ]
  const [movies, setMovies] = useState<Item[]>([])
  let movieList: Item[] = []
  const [movieRatings, setMovieRatings] = useState({})
  const [emailAddress, setEmailAddress] = useState('')
  const [newUserEmailAddress, setNewUserEmailAddress] = useState('');
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);
  
  // modal props
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  interface Props
  {
      movies: Item[]
  }

  // to handle when user select a rating - save to an object with key(movie name)-value(selected rating) pair
  function handleSelect(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) {
    setMovieRatings({...movieRatings, [key]: event.target.value})
  }

  // to handle input when user types in email address
  function handleInput(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEmailAddress(event.target.value)
    setSuccessfulSubmit(false);
    setErrorMsg("");
  }

  // handle submit after user entered their email address
  async function handleSubmit() {
    try {
      const res = await fetch('/api/allowedUsers');
      const allowedUsers = await res.json();
      // user is found
      if(allowedUsers?.find((allowedUser: any) => allowedUser.emailAddress === emailAddress)) {
        try {
          const data = await getRatings();
          if(data?.output?.length > 0) { // user already has ratings. Disable don't fetch movies
            setErrorMsg("You have already rated movies!");
            setNewUserEmailAddress("");
          } else { // user has not rated movies
            await fetchMovies(); // fetch movies to rate
          }
        } catch(err: any) {
          setErrorMsg("Error getting ratings for user.");
        }
      } else { // if user is not found
        setErrorMsg("User is not found. Please register as a new user.");
        setNewUserEmailAddress("");
      }
    } catch(err: any) {
      // allowed users API fetch error
      setErrorMsg("Allowed Users API fetch failed.");
      setNewUserEmailAddress("");
    }
  }

  // movie poster and title fetch
  async function fetchMovies() {  
    try {
      const res = await Promise.all(movieUrls.map(e => fetch(e, {
        method: "GET",
        headers: { 
          'X-RapidAPI-Key': "80ea1982d5msh094b5a03b6ce240p152960jsn3d7f5f682b43", // TODO: remove this if env is figured out.
          'X-RapidAPI-Host': "movie-database-alternative.p.rapidapi.com",
          "Content-Type": "application/json" 
        }
      })));

      let resJson = await Promise.all(res.map(e => e.json()))
      for (const each of resJson) {
        const movieData = {name: each.Title, imageURL: each.Poster} as Item
        movieList.push(movieData)
      }

      setMovies(movieList)
      setErrorMsg("");
    } catch (err: any) {
      setErrorMsg("Fetching movies failed.");
    }
  }

  // Grab ratings for user email address entered
  async function getRatings() {
    try {
      const resp = await fetch(`/api/getMovieRatings?userId=${ASCIItoHEX(emailAddress)}`)
      const respJson = await resp.json();
      setErrorMsg("");
      return respJson;
    } catch(err: any) {
      setErrorMsg("Fetching movie ratings from the block chain");
    }
  }
    
  // submit movie ratings to the blockchain
  async function submitRatings() {
    try {
      const ratings = [];
      for (const [key, value] of Object.entries(movieRatings)) {
        ratings.push(fetch(`/api/setMovieRating`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: ASCIItoHEX(emailAddress),
            ratingInfo: 
            {
                movieTitle: ASCIItoHEX(key),
                movieRating: ASCIItoHEX(value)
            }
          }),
        }));
      }
      const promises = await Promise.all(ratings);
      await Promise.all(promises.map(e => e.json()))

      setMovies([]);
      setEmailAddress('');
      setErrorMsg("");
      setSuccessfulSubmit(true);
      setMovieRatings({});
    } catch(err: any) {
      setMovies([]);
      setEmailAddress('');
      setErrorMsg("Failed to submit ratings. Please try again.");
      setSuccessfulSubmit(false);
      setMovieRatings({});
    }
  }

  // Render movie posters + titles + select options
  class MovieCarousel extends React.Component<Props, {}> {
    render() {
      return movies?.length > 0 && (
        <body>
          <main id="carousel" style={{flexDirection: "row", display: "flex"}}>
            {movies.map(movie => 
              <span style={{marginRight: "20px"}} key={`${movie.name}-span`}>
                  <div title={movie.name} className="movie-card" key={movie.name} style={{ backgroundImage: `url(${movie.imageURL})`}}></div>
                  <label className="select-label">
                    <TextField
                      key={movie.imageURL}
                      id={movie.imageURL}
                      select
                      label="Select"
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

  return (
    <div className="App">
      <header className="App-header">
        <h1><img src="../images/movie-icon-2.png" alt="movie-icon" style={{width: '50px'}}/>ReelRater</h1>
        <br />
        {movies?.length === 0 && 
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
          movies?.length > 0 && (
            <>
              <br/>
              <p>
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
        <br />
        {
          movies?.length === 0 && 
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
        }
        <br/>
        {successfulSubmit && <Alert variant="filled" severity="success">Your submission was successful! Thank you for rating!</Alert>}
        {errorMsg && <Alert variant="filled" severity="error">Error: {errorMsg}</Alert>}
      </header>
    </div>
  );
}

export default App;
