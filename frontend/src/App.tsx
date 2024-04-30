import { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  TextField,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import useWebSocket, { ReadyState } from "react-use-websocket";

const App = () => {
  type playerObj = {
    name: string;
    totalPlayerBet: number;
    playerBalance: number;
  };

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [guess, setGuess] = useState(0);
  const [guessSent, setGuessSent] = useState(false);
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [bet, setBet] = useState(0);
  const [currentBetBalance, setCurrentBetBalance] = useState(0);
  const [players] = useState(Array<playerObj>);

  const WS_URL = "ws://localhost:5000/ws";
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed");
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        type: "start",
        name: "dice-guess",
        namespace: "default",
        autoack: true,
      });
      setLoading(false);
    }
  }, [readyState, sendJsonMessage]);

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    const mess: any = lastJsonMessage;

    console.log(`Got a new message: ${lastJsonMessage}`, lastJsonMessage);
    if (mess?.type === "blockchain_event_received") {
      const name = mess?.blockchainEvent?.name;
      const res = mess?.blockchainEvent?.output;
      const playerFound = players.find((p) => p.name === res?.from);
      if (name === "GuessMade") {
        setGuessSent(true);
        setLoading(false);
        setDice1(parseInt(res?.dice1));
        setDice2(parseInt(res?.dice2));
        setCurrentBetBalance(res?.currentBetBalance);
        if (playerFound) {
          if (playerFound.totalPlayerBet !== 0) {
            playerFound.totalPlayerBet =
              +playerFound.totalPlayerBet + +res?.playerBet;
          } else {
            playerFound.totalPlayerBet = +res?.playerBet;
          }
          playerFound.playerBalance = res?.playerBalance;
        } else {
          players.push({
            name: res?.from,
            totalPlayerBet: res?.playerBet,
            playerBalance: res?.playerBalance,
          });
        }
      } else if (name === "BalanceTransferred") {
        // transferring funds so player info already exists
        if (playerFound) {
          playerFound.totalPlayerBet = 0;
          playerFound.playerBalance = +res?.playerBalance;
        }
        for (let i = 0; i < players.length; i++) {
          // reset the bet amount for each player
          players[i].totalPlayerBet = 0;
        }
        setGuess(0);
        setGuessSent(false);
        setCurrentBetBalance(0);
        setBet(0);
        setLoading(false);
      }
    }
  }, [lastJsonMessage]);

  const getTokens = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await fetch("api/getTokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentBetBalance: currentBetBalance,
        }),
      });
    } catch (err: any) {
      setErrorMsg(err.stack);
      setLoading(false);
    }
  };

  const sendGuess = async () => {
    setLoading(true);
    setErrorMsg(null);
    setGuessSent(false);
    try {
      const res = await fetch(`/api/sendGuess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guess: guess,
          betAmount: bet,
        }),
      });
      const { error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
        setLoading(false);
      }
    } catch (err: any) {
      setErrorMsg(err.stack);
      setLoading(false);
    }
  };

  const handleGuess = (val: string) => {
    setGuess(parseInt(val));
  };

  const handleBet = (val: string) => {
    setBet(parseInt(val));
  };

  const checkIfWinner = () => {
    if (guessSent) {
      if (dice1 + dice2 === guess) {
        return "You are the winner, please click 'Get Tokens'";
      } else {
        return "You did not win. Please play again!";
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={"/dices.svg"} className="App-logo" alt="logo" />
        {!loading && players.length ? (
          <TableContainer className="tableContainer" component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Player ID</TableCell>
                  <TableCell>Bet Amount</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {players.map((p) => (
                  <TableRow key={p?.name}>
                    <TableCell>{p?.name}</TableCell>
                    <TableCell>{p?.totalPlayerBet?.toString()}</TableCell>
                    <TableCell>{p?.playerBalance?.toString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : null}
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <div className="directions">
              Guess the sum of the dice! If you guess right, you win the money
              in the pool!
            </div>
            <p>
              <TextField
                size="small"
                error={!guess || guess < 2 || guess > 12}
                onChange={(e) => handleGuess(e.currentTarget.value)}
                value={guess || ""}
                label="Guess"
                helperText="Enter a number 2-12"
              />
              <TextField
                size="small"
                error={!bet || bet <= 0}
                onChange={(e) => handleBet(e.currentTarget.value)}
                value={bet || ""}
                label="Bet"
                helperText="Bet more than 0"
              />
              <Button
                variant="contained"
                disabled={!guess || guess < 2 || guess > 12 || !bet || bet <= 0}
                onClick={sendGuess}
              >
                Play Game
              </Button>
              <div className="checkIfWinner">{checkIfWinner()}</div>
              {dice1 + dice2 === guess && guessSent ? (
                <Button variant="contained" onClick={getTokens}>
                  Get Tokens
                </Button>
              ) : null}
            </p>
            <div>Current Bet Pool: {currentBetBalance}</div>
          </>
        )}
        {errorMsg && <pre className="App-error">Error: {errorMsg}</pre>}
      </header>
    </div>
  );
};

export default App;
