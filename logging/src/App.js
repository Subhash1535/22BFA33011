// src/App.js
import React, { useEffect } from 'react';
import { logRequest, logResponse } from './loggingMiddleware';

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMDIyY3NtLnIxMUBzdmNlLmVkdS5pbiIsImV4cCI6MTc1Mzc3MjA1NywiaWF0IjoxNzUzNzcxMTU3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNzY0Y2Y3ZmQtMzIzOS00ZTBkLTg0MTctNzEzMTYzMjY2OTdlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYW5uYXBhcmVkZHkgc3ViaGFzaCIsInN1YiI6ImMzMTc1ZDZiLTRjMGYtNGE0Mi05ZjMxLTZiNjk4ZDc4YTdkMSJ9LCJlbWFpbCI6IjIwMjJjc20ucjExQHN2Y2UuZWR1LmluIiwibmFtZSI6ImFubmFwYXJlZGR5IHN1Ymhhc2giLCJyb2xsTm8iOiIyMmJmYTMzMDExIiwiYWNjZXNzQ29kZSI6IlByanlRRiIsImNsaWVudElEIjoiYzMxNzVkNmItNGMwZi00YTQyLTlmMzEtNmI2OThkNzhhN2QxIiwiY2xpZW50U2VjcmV0IjoiRGVUUVNlREZnVnB1WVNFTSJ9.IpIXofuCauCicYXsk8-QLSLLSL9qEIBZbK41daCT1Iw`;

      const url = 'http://20.244.56.144/evaluation-service'; // Your backend API
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      logRequest(url, options);

      try {
        const response = await fetch(url, options);
        logResponse(response);

        const data = await response.json();
        console.log("📦 Response Data:", data);
      } catch (error) {
        console.error("❌ Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>JWT Auth Logging Middleware</h2>
      <p>Open browser console to view API logs.</p>
    </div>
  );
};

export default App;
