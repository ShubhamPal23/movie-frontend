// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import "./Auth.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3000/register", {
//         name,
//         email,
//         password,
//       });
//       setMessage(response.data.message);
//       if (response.data.name) {
//         window.location.href = "/login";
//       }
//     } catch (error) {
//       setMessage(error.response?.data?.message || "An error occurred");
//     }
//   };
const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://movie-backend-t8yr.onrender.com/register", { // Updated URL
        name,
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.data.name) {
        window.location.href = "/login";
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSignup}>
        <h2>Signup</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit" className="authi-button">Signup</button>
        {message && <p className="auth-message">{message}</p>}
      </form>
    </div>
  );
};

export default Signup;
