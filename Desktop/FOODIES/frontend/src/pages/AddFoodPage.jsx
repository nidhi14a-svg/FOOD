import React, { useState } from "react";
import { addFood } from "../services/api";

function AddFoodPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState("Prepared Meal");
  const [expiry, setExpiry] = useState("");
  const [location, setLocation] = useState("");
  const [providerId, setProviderId] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await addFood({ provider_id: providerId, title, description, quantity, type, expiry, location });
      setMessage("Food item listed successfully.");
      setTitle("");
      setDescription("");
      setQuantity(1);
      setExpiry("");
      setLocation("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Add Food</h2>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Provider ID</label>
          <input value={providerId} onChange={(e) => setProviderId(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} type="number" min="1" required />
        </div>
        <div className="form-group">
          <label>Type</label>
          <input value={type} onChange={(e) => setType(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Expiry</label>
          <input value={expiry} onChange={(e) => setExpiry(e.target.value)} type="datetime-local" required />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
        <button className="primary" type="submit">Submit Food</button>
      </form>
    </div>
  );
}

export default AddFoodPage;
