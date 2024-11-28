// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredMovies } from "../redux/MovieSlice";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "./Recommendation.css";

const Recommendation = () => {
  const dispatch = useDispatch();
  const { movies, filteredMovies } = useSelector((state) => state.movie);
  const [keyword, setKeyword] = useState("");
  const [sortByYear, setSortByYear] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 20;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleRecommend = () => {
    if (keyword.trim() === "") {
      dispatch(setFilteredMovies([]));
    } else {
      const keywordsArray = keyword.toLowerCase().split(" ");
      let results = movies.filter((movie) =>
        keywordsArray.some((kw) =>
          Object.values(movie).some((value) =>
            String(value).toLowerCase().includes(kw)
          )
        )
      );

      if (sortByYear) {
        results = results.sort((a, b) => {
          const yearA = parseInt(a.movieYear, 10) || 0;
          const yearB = parseInt(b.movieYear, 10) || 0;
          return yearB - yearA;
        });
      }

      dispatch(setFilteredMovies(results));
      setCurrentPage(0);
      navigate(`/recommendation?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const displayMovies = filteredMovies.slice(
    currentPage * moviesPerPage,
    (currentPage + 1) * moviesPerPage
  );

  return (
    <div id="recommendation" className={isLoggedIn ? "" : "blurred"}>
      {!isLoggedIn && (
        <div className="overlay">
          <h2>Please log in to access recommendations</h2>
          <button className="auth-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="auth-button" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      )}

      <h2 style={{ textAlign: "center", marginTop: "20px" }}>
        Find Your Perfect Movie
      </h2>
      <input
        type="text"
        placeholder="Type a movie keyword..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="recommend-input"
      />
      <button onClick={handleRecommend} className="search-button">
        Recommend
      </button>
      <label>
        <input
          type="checkbox"
          checked={sortByYear}
          onChange={() => setSortByYear((prev) => !prev)}
        />
        Sort by Latest Year
      </label>
      <div>
        {displayMovies.length > 0 ? (
          displayMovies.map((movie) => (
            <div key={movie.movieId} className="last-work">
              <div className="recom-img">
                <img
                  onClick={() => {
                    navigate(
                      `/recommendation/${encodeURIComponent(movie.movieTitle)}`
                    );
                  }}
                  src={movie.imageLink}
                  alt={movie.movieTitle}
                />
              </div>
              <div className="recom-details">
                <div className="recomm-heading">
                  <a
                    style={{ textDecoration: "none", cursor: "pointer" }}
                    onClick={() => {
                      navigate(
                        `/recommendation/${encodeURIComponent(
                          movie.movieTitle
                        )}`
                      );
                    }}
                  >
                    <h3 style={{ color: "black" }}>
                      <strong>{movie.movieTitle}</strong>
                    </h3>
                  </a>
                  <span style={{ color: "#00000075", fontSize:"20px",marginRight:"10px" }}>{movie.movieYear}</span>
                </div>
                <p style={{ color: "black" }}>{movie.genres || "N/A"}</p>
                <p
                  className="recom-overview"
                  style={{
                    color: "black",
                    marginTop: "20px",
                    fontSize: "1rem",
                  }}
                >
                  {movie.overview || "N/A"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-recom" style={{ minHeight: "510px" }}>
            <p>No recommendations found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredMovies.length > moviesPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(filteredMovies.length / moviesPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default Recommendation;
