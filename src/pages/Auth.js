import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isRegister
        ? "https://mern-auth-h7z6.onrender.com/api/auth/register"
        : "https://mern-auth-h7z6.onrender.com/api/auth/login";
  
      // Prepare request data properly
      const requestData = isRegister
        ? { name, email, password }  // Include name for registration
        : { email, password };       // Exclude name for login
  
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
      alert(error.response?.data?.message || "An error occurred");
    }
  };
  
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 w-50">
        <h2 className="text-center mb-4">{isRegister ? "Register" : "Login"}</h2>
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
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        {/* Forgot Password Link (Visible only on Login Page) */}
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
