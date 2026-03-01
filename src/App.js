import { useState } from "react";

import './App.css';

function App() {

 const [email, setEmail] = useState("");
  const [apiUrl, setApiUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

   const handleTest = async (e) => {
    e.preventDefault();

    if (!email || !apiUrl) {
      alert("Both fields are required.");
      // return;
    }

    try {
      setLoading(true);
      setResult(null);

      const validatorUrl = `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${encodeURIComponent(apiUrl)}&email=${encodeURIComponent(email)}`;

      const response = await fetch(validatorUrl);
      const data = await response.json();

      setResult(data);
    } catch (error) {
      setResult({ error: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>API Validation Tester</h2>

      <form onSubmit={handleTest}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "400px", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>API Endpoint URL:</label>
          <br />
          <input
            type="text"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            // placeholder="https://developer-task.onrender.com/sort-word"
            style={{ width: "400px", padding: "8px" }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Testing..." : "Validate API"}
        </button>
      </form>

      {result && (
        <pre style={{ marginTop: "2rem", background: "#f4f4f4", padding: "1rem" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
