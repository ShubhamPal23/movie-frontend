/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { useNavigate, useLocation } from "react-router-dom";
import "./Home.css";
import ReactPaginate from "react-paginate";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const selectedGenres = location.state?.selectedGenres || [];

  const URL = import.meta.env.VITE_BACKEND_URL;
  const MOVIE_API_URL = (page, genreIds) => {
    if (genreIds.length > 0) {
      console.log(genreIds.length);
      console.log(genreIds);
      return `${URL}toprated?page=${page}&genres=${genreIds.join(",")}`;
    }
    return `${URL}toprated?page=${page}`;
  };

  // Fetch genres from the backend
  useEffect(() => {
    fetch(`${URL}genre`)
      .then((response) => response.json())
      .then((data) => {
        const genremap = data.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genremap);
      })
      .catch((error) => console.error("Error fetching genre data:", error));
  }, []);

  // Fetch movies whenever the page or selected genres change
  useEffect(() => {
    fetchMovies(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("loaded movies");
  }, [currentPage]);

  const fetchMovies = (page) => {
    const genreIds = selectedGenres.length > 0 ? selectedGenres : [];
    fetch(MOVIE_API_URL(page, genreIds))
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.movies); // Assuming backend paginates and returns {movies: [], totalPages: N}
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error("Error fetching movie data:", error));
  };

  const handlePageChange = (data) => {
    const selectedPage = data.selected + 1;
    setCurrentPage(selectedPage);
  };

  const handlegenre = () => {
    navigate("/genre");
  };

  const handleSearch = () => {
    if (query) {
      navigate(`/search?query=${query}`, { state: { query } });
    }
  };

  return (
    <div id="home">
      <div className="blue">
        <div
          style={{ paddingTop: "70px", paddingLeft: "20px" }}
          className="bluecontent"
        >
          <h2 style={{ color: "white" }}>Welcome</h2>
          <h3 style={{ color: "white" }}>
            Thousands of Movies, TV Shows, and Endless Entertainment await.
            Explore Now
          </h3>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie, tv show......"
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button
            style={{ borderRadius: "30px" }}
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>
      </div>

      <div className="home-container">
        <div className="content">
          <button onClick={handlegenre} className="genre-btn">
            Select Your Favourite Genre
          </button>
          <h1>Top Movies</h1>
        </div>

        <div className="movie-grid">
          {movies.map((movie) => {
            const movieGenres = movie.genre_ids.map(
              (id) => genres[id] || "Unknown"
            );
            return (
              <MovieCard
                key={movie._id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
                genres={movieGenres}
              />
            );
          })}
        </div>

        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Home;
