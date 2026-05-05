import React from "react";

function FoodCard({ item, onComplete }) {
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <p><strong>Quantity:</strong> {item.quantity}</p>
      <p><strong>Location:</strong> {item.location}</p>
      <p><strong>Expiry:</strong> {new Date(item.expiry).toLocaleString()}</p>
      <button className="primary" onClick={() => onComplete(item.id)}>Mark Completed</button>
    </div>
  );
}

export default FoodCard;
