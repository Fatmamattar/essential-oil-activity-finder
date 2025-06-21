import { useState } from 'react';

function App() {
  const [features, setFeatures] = useState(Array(10).fill(0));
  const [result, setResult] = useState('');

  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = parseFloat(value);
    setFeatures(updated);
  };

  const handlePredict = async () => {
  try {
    const response = await fetch("https://29036e4cb32be8988e.gradio.live/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ data: [features] })  // <== This is how Gradio wants the input
    });

    const resultData = await response.json();
    setResult(resultData.data[0]); // display first result
  } catch (err) {
    console.error("Error:", err);
    setResult("Prediction failed.");
  }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h1>🌿 Essential Oil Activity Predictor</h1>
      {features.map((val, i) => (
        <div key={i}>
          <label>Feature {i + 1}: </label>
          <input
            type="number"
            value={val}
            step="0.1"
            onChange={(e) => handleChange(i, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handlePredict} style={{ marginTop: '1rem' }}>Predict</button>
      <div style={{ marginTop: '1rem' }}>
        <strong>Result:</strong> {result}
      </div>
    </div>
  );
}

export default App;
