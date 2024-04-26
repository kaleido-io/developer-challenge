import { FormEvent, useState } from "react";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [dAmt, setDeposit] = useState(0)
  const [wAmt, setWithdraw] = useState(0)
  const [value, setValue] = useState("");
  const [bet, setBet] = useState(0)

  const getOwner = async() => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/getOwner`);
      const { b, error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      } else {
        setOwner(b);
      }
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
    setLoading(false);
  }

  const addOwner = async() => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/placeBet`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          betAmount: dAmt,
          number: bet
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


  // const setBet = async() => {
  //   setLoading(true);
  //   setErrorMsg(null);
  //   try {
  //     console.log('remove', owner)
  //     const res = await fetch(`/api/removeOwner`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         owner: owner,
  //       }),
  //     });
  //     const { error } = await res.json();
  //     if (!res.ok) {
  //       setErrorMsg(error);
  //     }
  //   } catch (err: any) {
  //     setErrorMsg(err.stack);
  //   }
  //   setLoading(false);
  // }


  const getBalance = async() => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/balance`);
      const { b, error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      } else {
        setValue(b);
      }
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
    setLoading(false);
  }

  const deposit = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: dAmt,
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

  const withdraw = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: wAmt,
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


  // function handleChange(event: FormEvent<HTMLInputElement>) {
  //   setDesiredValue(event.currentTarget.value);
  // }

  const handleAddOwner = (val: string) => {
    setDeposit(parseInt(val))
  }

  const handleBetNumber = (val: string) => {
    setBet(parseInt(val))
  }

  const handleDeposit = (val: string) => {
    setDeposit(Number(val))
  }

  const handleWithdraw = (val: string) => {
    setWithdraw(Number(val))
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img
          src={"/kaleido_logo.svg"}
          className="App-logo"
          alt="logo"
          aria-busy={loading}
        /> */}
        <p>
          <button
            type="button"
            className="App-button"
            onClick={getBalance}
          >
            Get Balance
          </button>
          {value !== "" ? <p>Balance: {value}</p> : <p>&nbsp;</p>}
        </p>
        {/* <p>
          <button
            type="button"
            className="App-button"
            onClick={getOwner}
          >
            Get Owner
          </button>
          {owner !== "" ? <p>Owner: {owner}</p> : <p>&nbsp;</p>}
        </p> */}
        <p>
          <input className="App-input" onChange={(e) => handleAddOwner(e.currentTarget.value)} />
          <input className="App-input" onChange={(e) => handleBetNumber(e.currentTarget.value)} />
          <button
            type="button"
            className="App-button"
            onClick={addOwner}
          >
            Add Owner
          </button>
        </p>
        {/* <p>
          <input className="App-input" onChange={(e) => handleRemoveOwner(e.currentTarget.value)} />
          <button
            type="button"
            className="App-button"
            onClick={removeOwner}
          >
            Remove Owner
          </button>
        </p> */}
        <p>
          <input className="App-input" onChange={(e) => handleDeposit(e.currentTarget.value)} />
          <button
            type="button"
            className="App-button"
            onClick={deposit}
          >
            Deposit
          </button>
        </p>
        <p>
          <input className="App-input" onChange={(e) => handleWithdraw(e.currentTarget.value)} />
          <button
            type="button"
            className="App-button"
            onClick={withdraw}
          >
            Withdraw
          </button>
        </p>
        {errorMsg && <pre className="App-error">Error: {errorMsg}</pre>}
      </header>
    </div>
  );
}

export default App;
