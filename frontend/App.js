
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [samples, setSamples] = useState([0, 0, 0, 0, 0]);
  const [records, setRecords] = useState([]);

  const handleChange = (index, value) => {
    const newSamples = [...samples];
    newSamples[index] = parseFloat(value);
    setSamples(newSamples);
  };

  const calculateAverage = () => {
    return samples.reduce((a, b) => a + b, 0) / samples.length;
  };

  const hasDeviation = () => {
    return samples.some(s => s < 900 || s > 930);
  };

  const handleSubmit = async () => {
    const record = {
      location: "Default Location",
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      samples,
      average: calculateAverage(),
      deviation: hasDeviation(),
      deviationReason: hasDeviation() ? "Out of range" : "",
      correctiveAction: "",
      comments: "",
      auditTrail: []
    };
    const res = await axios.post('http://localhost:5000/api/records', record);
    setRecords([...records, res.data]);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/api/records').then(res => setRecords(res.data));
  }, []);

  return (
    <div>
      <h1>QA Weight Check</h1>
      {samples.map((s, i) => (
        <input key={i} type="number" value={s} onChange={e => handleChange(i, e.target.value)} />
      ))}
      <div>Average: {calculateAverage().toFixed(2)}</div>
      <div>Deviation: {hasDeviation() ? "Yes" : "No"}</div>
      <button onClick={handleSubmit}>Submit</button>
      <h2>Records</h2>
      <ul>
        {records.map((r, i) => (
          <li key={i}>{r.date} {r.time} - Avg: {r.average.toFixed(2)} - Deviation: {r.deviation ? "Yes" : "No"}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
