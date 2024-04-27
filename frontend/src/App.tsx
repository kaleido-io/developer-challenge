import { FormEvent, useState } from "react";
import "./App.css";
import { Button, TextField } from "@mui/material";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [guess, setGuess] = useState(0);

  // const getBalance = async() => {
  //   setLoading(true);
  //   setErrorMsg(null);
  //   try {
  //     const res = await fetch(`/api/balance`);
  //     const { b, error } = await res.json();
  //     if (!res.ok) {
  //       setErrorMsg(error);
  //     } else {
  //       setValue(b);
  //     }
  //   } catch (err: any) {
  //     setErrorMsg(err.stack);
  //   }
  //   setLoading(false);
  // }

  const sendGuess = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/sendGuess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guess: guess,
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
  };

  const handleGuess = (val: string) => {
    setGuess(parseInt(val));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={"/dices.svg"}
          className="App-logo"
          alt="logo"
          aria-busy={loading}
        />
        <div>Guess the sum of the dice!</div>
        <p>
          <TextField
            size="small"
            error={!guess || guess < 1 || guess > 12}
            onChange={(e) => handleGuess(e.currentTarget.value)}
          />
          <Button 
            variant="contained"
            disabled={!guess || guess < 1 || guess > 12}
            onClick={sendGuess}
          >
            Send Guess
          </Button>
        </p>
        {errorMsg && <pre className="App-error">Error: {errorMsg}</pre>}
      </header>
    </div>
  );
};

export default App;
