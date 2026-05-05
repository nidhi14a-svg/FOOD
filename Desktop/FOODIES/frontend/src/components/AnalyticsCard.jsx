import React from "react";

function AnalyticsCard({ title, value, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{value}</p>
      {children}
    </div>
  );
}

export default AnalyticsCard;
