import React, { useState } from "react";

function App() {
  // Form inputs
  const [longUrl, setLongUrl] = useState("");
  const [minutes, setMinutes] = useState(30);

  // Stores created links
  const [shortLinks, setShortLinks] = useState([]);

  // Stores log when a link is accessed
  const [accessLog, setAccessLog] = useState([]);

  // This function creates a random short code like 'ab1cd2'
  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  // When user clicks "Shorten"
  const handleShorten = () => {
    const code = generateShortCode();
    const createdAt = Date.now();
    const validFor = minutes * 60 * 1000; // minutes → milliseconds

    // Create new short link object
    const newLink = {
      code,
      longUrl,
      createdAt,
      validFor,
      accesses: [], // logs will be stored here
    };

    // Save to localStorage (browser storage)
    const saved = JSON.parse(localStorage.getItem("shortLinks") || "[]");
    saved.push(newLink);
    localStorage.setItem("shortLinks", JSON.stringify(saved));
    setShortLinks(saved);

    alert(`✅ Short URL created:\n${window.location.origin}/#/${code}`);
  };

  // When user clicks "Visit"
  const handleVisit = (code) => {
    const saved = JSON.parse(localStorage.getItem("shortLinks") || "[]");
    const link = saved.find((l) => l.code === code);

    if (!link) return alert("❌ Link not found.");

    const now = Date.now();
    const isExpired = now - link.createdAt > link.validFor;

    if (isExpired) return alert("⏰ This link has expired.");

    // Log the visit
    link.accesses.push({
      time: new Date().toLocaleString(),
      device: navigator.userAgent,
    });

    // Save updated logs
    localStorage.setItem("shortLinks", JSON.stringify(saved));
    setAccessLog(link.accesses);

    // Open original URL in new tab
    window.open(link.longUrl, "_blank");
  };

  // When user clicks "Load My Links"
  const loadLinks = () => {
    const saved = JSON.parse(localStorage.getItem("shortLinks") || "[]");
    setShortLinks(saved);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h2>🔗 Simple URL Shortener (React Only)</h2>

      <input
        type="text"
        placeholder="Paste your long URL here"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        style={{ width: "300px" }}
      />
      <br /><br />

      <input
        type="number"
        min="1"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Valid time (minutes)"
      />
      <span> min</span>
      <br /><br />

      <button onClick={handleShorten}>Shorten</button>
      <button onClick={loadLinks} style={{ marginLeft: 10 }}>Load My Links</button>

      <hr />

      <h4>📋 My Shortened Links</h4>
      {shortLinks.length === 0 ? (
        <p>No links found. Create one!</p>
      ) : (
        shortLinks.map((link, i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <strong>{window.location.origin}/#/{link.code}</strong><br />
            <button onClick={() => handleVisit(link.code)}>Visit</button>
          </div>
        ))
      )}

      <hr />

      <h4>📈 Access Log</h4>
      {accessLog.length === 0 ? (
        <p>No access recorded yet.</p>
      ) : (
        accessLog.map((log, i) => (
          <div key={i}>
            {i + 1}. {log.time} – {log.device}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
