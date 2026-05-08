import React, { useState } from "react";
import { register } from "../services/api";

function RegisterPage({ onRegistered }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ngo");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await register(name, email, password, role);
      setMessage("Registration successful. Please login.");
      onRegistered();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="ngo">NGO</option>
            <option value="provider">Food Provider</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="primary" type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
