import React, { useEffect, useState } from "react";
import { getFoodList, completeFood } from "../services/api";

function FoodListPage() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterLocation, setFilterLocation] = useState("");

  const loadFood = async () => {
    setError(null);
    try {
      const data = await getFoodList({ status: "Available", type: filterType, location: filterLocation });
      setItems(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadFood();
  }, []);

  const handleComplete = async (foodId) => {
    try {
      await completeFood(foodId);
      loadFood();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Available Food</h2>
      {error && <div className="alert error">{error}</div>}
      <div className="inline-grid grid-3" style={{ marginBottom: 20 }}>
        <div className="form-group">
          <label>Type</label>
          <input value={filterType} onChange={(e) => setFilterType(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} />
        </div>
        <div className="form-group" style={{ alignSelf: "end" }}>
          <button className="primary" type="button" onClick={loadFood}>Refresh</button>
        </div>
      </div>

      {items.length === 0 && <p>No available food found.</p>}
      {items.map((item) => (
        <div className="card" key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Type:</strong> {item.type}</p>
          <p><strong>Location:</strong> {item.location}</p>
          <p><strong>Expiry:</strong> {new Date(item.expiry).toLocaleString()}</p>
          <button className="primary" type="button" onClick={() => handleComplete(item.id)}>Mark Completed</button>
        </div>
      ))}
    </div>
  );
}

export default FoodListPage;
