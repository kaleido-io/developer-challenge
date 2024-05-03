import { FormEvent, useState } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [desiredValue, setDesiredValue] = useState("test");
  const [value, setValue] = useState("");
  const [tokenId, setTokenId] = useState("");

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

  async function mintToken() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/mintToken`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenId,
        }),
      });
      const { error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      } else {
        setTokenId(tokenId);
      }
    } catch (err: any) {
      setErrorMsg(err.stack);
    }
    setLoading(false);
  }

  function handleChange(event: FormEvent<HTMLInputElement>) {
    setDesiredValue(event.currentTarget.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={"/kaleido_logo.svg"}
          className="App-logo"
          alt="logo"
          aria-busy={loading}
        />
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
        <p>
          <button type="button" className="App-button" onClick={mintToken}>
            Mint a Token
          </button>
          {tokenId !== "" ? <p>Minted Token ID: {tokenId}</p> : <p>&nbsp;</p>}
        </p>
        {errorMsg && <pre className="App-error">Error: {errorMsg}</pre>}
      </header>
    </div>
  );
}

export default App;
