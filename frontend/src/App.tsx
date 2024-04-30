import { FormEvent, useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [guess, setGuess] = useState(0);
  const [guessSent, setGuessSent] = useState(false);
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [playerID, setPlayerID] = useState("");
  const [balance, setBalance] = useState(0);
  const [bet, setBet] = useState(0);
  const [currentBetBalance, setCurrentBetBalance] = useState(0);
  const [players] = useState(
    Array<{ name: string; totalPlayerBet: number; balance: number }>
  );

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
        // console.log('guess sent', parseInt(res.dice1), parse, parseInt(res.dice1) + parseInt(res.dice))
        // setResults(parseInt(res.dice1) + parseInt(res.dice2))
        setGuess(res?.guess);
        setDice1(res?.dice1);
        setDice2(res?.dice2);
        setGuessSent(true);
        setLoading(false);
        setCurrentBetBalance(res?.betBalance);
        if (playerFound) {
          playerFound.totalPlayerBet =
            +playerFound.totalPlayerBet + +res?.playerBet;
          playerFound.balance = res?.balance;
        } else {
          players.push({
            name: res?.from,
            totalPlayerBet: res?.playerBet,
            balance: res?.balance,
          });
        }
      } else {
        // transferring funds so player info already exists
        console.log("ELSE", playerFound);
        if (playerFound) {
          playerFound.totalPlayerBet = 0;
          playerFound.balance = +res?.balance;
        }
        for (let i = 0; i < players.length; i++) {
          // reset the bet amount
          players[i].totalPlayerBet = 0;
        }
        setGuess(0);
        setGuessSent(false);
        setCurrentBetBalance(0);
        setBet(0);
        setLoading(false);
      }
    }
    if (mess?.type === "token_transfer_confirmed") {
      setBalance(mess?.tokenTransfer?.amount);
      setCurrentBetBalance(currentBetBalance);
      setGuess(guess);
    }
  }, [lastJsonMessage, currentBetBalance, players]);

  // const getPlayer = async () => {
  //   try {
  //     const res = await fetch("/api/getPlayer", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         player: playerID,
  //       }),
  //     });

  //     // const getBalance = async() => {
  //     //   setLoading(true);
  //     //   setErrorMsg(null);
  //     //   try {
  //     //     const res = await fetch(`/api/balance`);
  //     //     const { b, error } = await res.json();
  //     //     if (!res.ok) {
  //     //       setErrorMsg(error);
  //     //     } else {
  //     //       setValue(b);
  //     //     }
  //     //   } catch (err: any) {
  //     //     setErrorMsg(err.stack);
  //     //   }
  //     //   setLoading(false);
  //     // }

  //     const r = await res.json();
  //     console.log("R", r);
  //   } catch (err: any) {
  //     setErrorMsg(err.stack);
  //   }
  // };

  const getTokens = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      console.log("playerid", playerID);
      const res = await fetch("api/getTokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player: playerID,
          currentBetBalance: currentBetBalance,
        }),
      });
      const r = await res.json();
      // const { error } = await res.json();
      // if (!res.ok) {
      //   setErrorMsg(error);
      // }

      // setBalance(r[0])
      // }
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
    // setLoading(false);
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
        return "You are the winner, please click `Get Tokens`";
      } else {
        return "You did not win. Please play again!";
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={"/dices.svg"}
          className="App-logo"
          alt="logo"
          // aria-busy={loading}
        />
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
                    <TableCell>{p?.balance?.toString()}</TableCell>
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
              {true ? (
                <Button variant="contained" onClick={getTokens}>
                  Get Tokens
                </Button>
              ) : null}
              {/* <Button variant="contained" onClick={getPlayer}>
                Get Player
              </Button> */}
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
