import React, { useState } from "react";
import axios from "axios";

// Dynamically set backend URL based on environment
const backendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.REACT_APP_BACKEND_URL || "https://mern-auth-h7z6.onrender.com";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 
    setError("");

    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/forgot-password`, { email });
      setMessage(data.message);
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setError(error.response?.data?.message || "Error sending reset link.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h2 className="text-center mb-4">Forgot Password</h2>

        {message && <p className="text-center text-success">{message}</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
