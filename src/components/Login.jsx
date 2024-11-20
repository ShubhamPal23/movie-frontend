// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/login", {
//         email,
//         password,
//       });
//       setMessage(response.data.message);
//       if (response.data.name) {
//         localStorage.setItem("username", response.data.name);
//         window.location.href = "/";
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred");
//     }
//   };
const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://movie-backend-t8yr.onrender.com/login", { // Updated URL
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.data.name) {
        localStorage.setItem("username", response.data.name);
        window.location.href = "/";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="authi-button">Login</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default Login;
