import React, { useState } from 'react';

function timeToSeconds(timeStr) {
  const [min, sec] = timeStr.split(":");
  return parseInt(min) * 60 + parseFloat(sec);
}

function calculateGMT(current, gold) {
  const currentSec = timeToSeconds(current);
  const goldSec = timeToSeconds(gold);
  return ((goldSec / currentSec) * 60).toFixed(2);
}

function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [goldTime, setGoldTime] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const performance = calculateGMT(currentTime, goldTime);
      setResult(performance);
    } catch {
      setResult('Invalid input');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>GMT % Calculator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Your time (mm:ss.ms): </label>
          <input value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} />
        </div>
        <div>
          <label>Gold time (mm:ss.ms): </label>
          <input value={goldTime} onChange={(e) => setGoldTime(e.target.value)} />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Calculate</button>
      </form>
      {result && (
        <p><strong>Result:</strong> {result}%</p>
      )}
    </div>
  );
}

export default App;
