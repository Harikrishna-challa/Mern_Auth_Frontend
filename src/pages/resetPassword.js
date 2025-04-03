import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); 
    setError("");

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password/${token}`, { password });

      setMessage(data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      console.error("Reset Password Error:", error);
      setError(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h2 className="text-center mb-4">Reset Password</h2>

        {message && <p className="text-center text-success">{message}</p>}
        {error && <p className="text-center text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
