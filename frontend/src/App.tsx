import React, { useState } from 'react';
import './App.css';
import logo from './logo.svg';

function App() {

  const [loading, setLoading] = useState(false);
  const [deployState, setDeployState] = useState("Deploy");
  const [contractAddress, setContractAddress] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [desiredValue, setDesiredValue] = useState('test');
  const [value, setValue] = useState("Get Value");

  async function deployContract() {
    setLoading(true);
    setErrorMsg(null);
    setDeployState("Deploying...")
    try {
      const res = await fetch('/api/contract', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: { 'Content-Type': 'application/json' }
      });
      const { contractAddress: addr, error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error)
        setDeployState("Error! - Retry Deploy");
      } else {
        setContractAddress(addr);
        setDeployState("Redeploy");
      }
    } catch (err: any) {
      setErrorMsg(err.stack)
      setDeployState("Error! - Retry Deploy");
    }
    setLoading(false);
  }

  async function setContractValue() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/contract/${contractAddress}/value`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          x: desiredValue
        })
      });
      const { error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error)
      }
    } catch (err: any) {
      setErrorMsg(err.stack)
    }
    setLoading(false);
  }

  async function getContractValue() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const res = await fetch(`/api/contract/${contractAddress}/value`);
      const { x, error } = await res.json();
      if (!res.ok) {
        setErrorMsg(error);
      } else {
        setValue(x);
      }
    } catch (err: any) {
      setErrorMsg(err.stack)
    }
    setLoading(false);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDesiredValue(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" aria-busy={loading} />
        <p>
          <button type="button" className="App-button" disabled={loading} onClick={deployContract}>{deployState} Contract</button>
        </p>
        {contractAddress && <p>
          Contract Address: {contractAddress}
        </p>}
        <p>
          <input className="App-input" disabled={loading || !contractAddress} onChange={handleChange} />
          <button type="button" className="App-button" disabled={loading || !contractAddress || !desiredValue} onClick={setContractValue}>Set Value</button>
        </p>
        <p>
          <button type="button" className="App-button" disabled={loading || !contractAddress} onClick={getContractValue}>{value}</button>
        </p>
        {errorMsg && <pre className="App-error">
          Error: {errorMsg}
        </pre>}
      </header>
    </div>
  );
}

export default App;
