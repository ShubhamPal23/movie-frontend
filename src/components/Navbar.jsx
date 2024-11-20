// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { NavLink,Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    setUsername("");
    navigate("/login");
  };
  const handleSearch = () => {
    if (query) {
      navigate(`/search?query=${query}`, { state: { query } });
      setSearchOpen(false);
    }
  };
  const handleSearchIconClick = () => {
    setSearchOpen(!searchOpen);
    setQuery("");
  };

  return (
    <nav className="navbar">
      {/* Left side */}
      <div className="navbar-brand">
        <Link style={{fontSize:"28px"}} to="/">MovieZone</Link>
      </div>

      {/* Middle */}
      <div className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/trending">Trending</NavLink>
        <NavLink to="/recommendation">Recommendation</NavLink>
      </div>

      {/* Right side */}
      <div className="navbar-actions">
        <div className="search-container" ref={searchRef}>
          <span className="search-icon" onClick={handleSearchIconClick}>
            {searchOpen ? <FaTimes /> : <FaSearch />}
          </span>
          {searchOpen && (
            <div className="navbar-search-bar">
              <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
          )}
        </div>
        {username ? (
          <>
            <span className="navbar-welcome">Welcome, {username}</span>
            <button className="auth-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-button">
              Login
            </Link>
            <Link to="/signup" className="auth-button">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
