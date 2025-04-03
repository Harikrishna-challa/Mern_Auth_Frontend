import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  // 🔥 Handle Account Deletion
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete("https://mern-auth-h7z6.onrender.com/api/auth/delete-account", {
        headers: { Authorization: token },
      });

      alert("Account deleted successfully.");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      navigate("/");
    } catch (error) {
      console.error("Delete Account Error:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h2>Welcome, {name}!</h2>

      <button className="btn btn-primary mt-3 mx-2" onClick={handleLogout}>
        Logout
      </button>

      <button className="btn btn-danger mt-3 mx-2" onClick={handleDeleteAccount}>
        Delete Account
      </button>
    </div>
  );
};

export default Home;
