import React, { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

function DashboardPage() {
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setSummary(await getAnalytics());
      } catch (err) {
        setError(err.message);
      }
    }
    load();
  }, []);

  return (
    <div className="card">
      <h2>Dashboard</h2>
      {error && <div className="alert error">{error}</div>}
      {!summary && !error && <p>Loading metrics...</p>}
      {summary && (
        <div className="grid-3 inline-grid">
          <div className="card">
            <h3>Meals Saved</h3>
            <p>{summary.meals_saved}</p>
          </div>
          <div className="card">
            <h3>Available Food Items</h3>
            <p>{summary.total_food_items}</p>
          </div>
          <div className="card">
            <h3>Active Claims</h3>
            <p>{summary.active_claims}</p>
          </div>
          <div className="card">
            <h3>Expired Items</h3>
            <p>{summary.expired_items}</p>
          </div>
          <div className="card">
            <h3>Top Priority</h3>
            <ul>
              {summary.top_priority_items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;
