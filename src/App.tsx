import React, { useEffect, useState } from "react";

function App() {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/emt-chapters.json")
      .then(res => res.json())
      .then(data => setChapters(data.chapters)) // <-- fix here!
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>EMS Study Notes</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {chapters.map((chap, idx) => (
            <li key={chap.id ?? idx}>
              <h2>Chapter {chap.id}: {chap.title}</h2>
              <p><strong>Estimated Time:</strong> {chap.estimatedTime}</p>
              <p><strong>Difficulty:</strong> {chap.difficulty}</p>
              <pre style={{ whiteSpace: "pre-wrap" }}>{chap.content}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;