import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Dynamically set backend URL based on environment
const backendUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.REACT_APP_BACKEND_URL || "https://mern-auth-h7z6.onrender.com";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const url = isRegister
        ? `${backendUrl}/api/auth/register`
        : `${backendUrl}/api/auth/login`;

      const requestData = isRegister
        ? { name, email, password }
        : { email, password };

      const { data } = await axios.post(url, requestData);

      if (!isRegister) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        navigate("/home");
      } else {
        alert("Registration successful! Please login.");
        setIsRegister(false);
      }
    } catch (error) {
      console.error("Auth Error:", error);
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h2 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h2>

        {error && <p className="text-danger text-center">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

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

          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {!isRegister && (
          <p className="mt-3 text-center">
            <button className="btn btn-link" onClick={() => navigate("/forgot-password")}>
              Forgot your password?
            </button>
          </p>
        )}

        <p className="mt-3 text-center">
          {isRegister ? "Already have an account?" : "New user?"}{" "}
          <button className="btn btn-link" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Login here" : "Register here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
