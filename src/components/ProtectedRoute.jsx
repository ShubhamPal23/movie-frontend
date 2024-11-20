/* eslint-disable no-unused-vars */
import React from "react";

const ProtectedRoute = ({ children }) => {
  const username = localStorage.getItem("username");

  if (!username) {
    return (
      <div className="overlay">
        <div className="overlay-content">
          <h2>Please log in to access recommendations</h2>
          <div className="protect-button">
            <button
              className="auth-button"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
            <button
              className="auth-button"
              onClick={() => (window.location.href = "/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
