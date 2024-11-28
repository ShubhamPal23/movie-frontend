/* eslint-disable no-unused-vars */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import MovieCard from "./MovieCard";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";
// import { useLocation } from "react-router-dom";
// import ReactPaginate from "react-paginate";

// const API_KEY=import.meta.env.VITE_API_KEY;
// const CURRENT_YEAR = new Date().getFullYear();
// const LAST_20_YEARS = CURRENT_YEAR - 30;

// const MOVIE_API_URL = (page, genreIds) => {
//   if (genreIds.length > 0) {
//     return `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreIds.join(
//       ","
//     )}&include_adult=false&release_date.gte=${LAST_20_YEARS}-01-01`;
//   }
//   return `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [movies, setMovies] = useState([]);
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [genres, setGenres] = useState({});
//   const selectedGenres = location.state?.selectedGenres || [];

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         const genreMap = data.genres.reduce((acc, genre) => {
//           acc[genre.id] = genre.name;
//           return acc;
//         }, {});
//         setGenres(genreMap);
//       })
//       .catch((error) => console.error("Error fetching genre data:", error));

//     fetchMovies(currentPage);
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [currentPage, selectedGenres]);

//   const fetchMovies = (page) => {
//     fetch(MOVIE_API_URL(page, selectedGenres))
//       .then((response) => response.json())
//       .then((data) => {
//         const filteredMovies = data.results.filter(
//           (movie) => !movie.adult && movie.poster_path
//         );

//         const sortedMovies = filteredMovies.sort(
//           (a, b) => b.vote_average - a.vote_average
//         );

//         setMovies(sortedMovies);
//         setTotalPages(data.total_pages);
//         console.log(data.total_pages);
//       })
//       .catch((error) => console.error("Error fetching movie data:", error));
//   };

//   const handlePageChange = (data) => {
//     const selectedPage = data.selected + 1;
//     setCurrentPage(selectedPage);
//   };
//   const handlegenre = () => {
//     navigate("/genre");
//   };
//   const handleSearch = () => {
//     if (query) {
//       navigate(`/search?query=${query}`, { state: { query } });
//     }
//   };

//   return (
//     <div id="home">
//       <div className="blue">
//         <div style={{paddingTop:"70px",paddingLeft:"20px"}} className="bluecontent">
//           <h2 style={{color:"white"}}>Welcome</h2>
//           <h3 style={{color:"white"}}>Thousands of Movies, TV Shows and Endless Entertainment await. Explore Now</h3>
//         </div>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search for a movie, tv show......"
//             spellCheck="false"
//             autoComplete="off"
//             autoCorrect="off"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="search-input"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleSearch();
//               }
//             }}
//           />
//           <button onClick={handleSearch} className="search-button">
//             Search
//           </button>
//         </div>
//       </div>
//       <div className="home-container">

//       <div className="content">
//         <button onClick={handlegenre} className="genre-btn">
//           Select Your Favourite Genre
//         </button>
//         <h1>Top Movies</h1>
//       </div>

//       <div className="movie-grid">
//         {movies.map((movie) => {
//           const movieGenres = movie.genre_ids.map(
//             (id) => genres[id] || "Unknown"
//           );
//           return (
//             <MovieCard
//               key={movie.id}
//               title={movie.title}
//               imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               rating={movie.vote_average}
//               genres={movieGenres}
//             />
//           );
//         })}
//       </div>

//       <ReactPaginate
//         previousLabel={"Previous"}
//         nextLabel={"Next"}
//         breakLabel={"..."}
//         breakClassName={"break-me"}
//         pageCount={totalPages}
//         marginPagesDisplayed={1}
//         pageRangeDisplayed={2}
//         onPageChange={handlePageChange}
//         containerClassName={"pagination"}
//         activeClassName={"active"}
//       />
//       </div>
//     </div>
//   );
// };

// export default Home;

// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import MovieCard from "./MovieCard";
// import { useNavigate } from "react-router-dom";
// import "./Home.css";
// import { useLocation } from "react-router-dom";
// import ReactPaginate from "react-paginate";

// const CURRENT_YEAR = new Date().getFullYear();
// const LAST_20_YEARS = CURRENT_YEAR - 20;

// const MOVIE_API_URL = (page, genreIds) => {
//   if (genreIds.length > 0) {
//     return `http://localhost:3000/movies/toprated?page=${page}&genres=${genreIds.join(
//       ","
//     )}`;
//   }
//   return `http://localhost:3000/movies/toprated?page=${page}`;
// };

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [movies, setMovies] = useState([]);
//   const [query, setQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [genres, setGenres] = useState([]);
//   const selectedGenres = location.state?.selectedGenres || [];

//   // Fetch genres from the backend
//   useEffect(() => {
//     fetch("http://localhost:3000/movies/genre")
//       .then((response) => response.json())
//       .then((data) => {
//         const genremap = data.reduce((acc, genre) => {
//           acc[genre.id] = genre.name;
//           return acc;
//         }, {});
//         console.log(genremap);
//         setGenres(genremap);
//       })
//       .catch((error) => console.error("Error fetching genre data:", error));
//   }, []);

//   // Fetch movies whenever the page or selected genres change
//   useEffect(() => {
//     fetchMovies(currentPage);
//   }, [currentPage,selectedGenres]);

//   const fetchMovies = (page) => {
//     fetch(`http://localhost:3000/movies/toprated?page=${page}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setMovies(data.movies); // Assuming backend paginates and returns {movies: [], totalPages: N}
//         setTotalPages(data.totalPages);
//       })
//       .catch((error) => console.error("Error fetching movie data:", error));
//   };

//   const handlePageChange = (data) => {
//     const selectedPage = data.selected + 1;
//     setCurrentPage(selectedPage);
//   };

//   const handlegenre = () => {
//     navigate("/genre");
//   };

//   const handleSearch = () => {
//     if (query) {
//       navigate(`/search?query=${query}`, { state: { query } });
//     }
//   };

//   return (
//     <div id="home">
//       <div className="blue">
//         <div
//           style={{ paddingTop: "70px", paddingLeft: "20px" }}
//           className="bluecontent"
//         >
//           <h2 style={{ color: "white" }}>Welcome</h2>
//           <h3 style={{ color: "white" }}>
//             Thousands of Movies, TV Shows and Endless Entertainment await.
//             Explore Now
//           </h3>
//         </div>
//         <div className="search-bar">
//           <input
//             type="text"
//             placeholder="Search for a movie, tv show......"
//             spellCheck="false"
//             autoComplete="off"
//             autoCorrect="off"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="search-input"
//             onKeyDown={(e) => {
//               if (e.key === "Enter") {
//                 handleSearch();
//               }
//             }}
//           />
//           <button onClick={handleSearch} className="search-button">
//             Search
//           </button>
//         </div>
//       </div>
//       <div className="home-container">
//         <div className="content">
//           <button onClick={handlegenre} className="genre-btn">
//             Select Your Favourite Genre
//           </button>
//           <h1>Top Movies</h1>
//         </div>

//         <div className="movie-grid">
//           {movies.map((movie) => {
//             const movieGenres = movie.genre_ids.map(
//               (id) => genres[id] || "Unknown"
//             );
//             return (
//               <MovieCard
//                 key={movie._id} // Use `_id` if MongoDB is generating IDs
//                 title={movie.title}
//                 imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Ensure `poster_path` is returned in the backend
//                 rating={movie.rating}
//                 genres={movieGenres}
//               />
//             );
//           })}
//         </div>

//         <ReactPaginate
//           previousLabel={"Previous"}
//           nextLabel={"Next"}
//           breakLabel={"..."}
//           breakClassName={"break-me"}
//           pageCount={totalPages}
//           marginPagesDisplayed={1}
//           pageRangeDisplayed={2}
//           onPageChange={handlePageChange}
//           containerClassName={"pagination"}
//           activeClassName={"active"}
//         />
//       </div>
//     </div>
//   );
// };

// export default Home;

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
  const selectedGenres = location.state?.selectedGenres || []; // Get selected genres from location state

  const MOVIE_API_URL = (page, genreIds) => {
    if (genreIds.length > 0) {
      console.log(genreIds.length)
      console.log(genreIds)
      return `http://localhost:3000/movies/toprated?page=${page}&genres=${genreIds.join(",")}`;
    }
    return `http://localhost:3000/movies/toprated?page=${page}`;
  };

  // Fetch genres from the backend
  useEffect(() => {
    fetch("http://localhost:3000/movies/genre")
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
  }, [currentPage, selectedGenres]);

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
        <div style={{ paddingTop: "70px", paddingLeft: "20px" }} className="bluecontent">
          <h2 style={{ color: "white" }}>Welcome</h2>
          <h3 style={{ color: "white" }}>
            Thousands of Movies, TV Shows, and Endless Entertainment await. Explore Now
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
          <button onClick={handleSearch} className="search-button">
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
            const movieGenres = movie.genre_ids.map((id) => genres[id] || "Unknown");
            return (
              <MovieCard
                key={movie._id} // Use _id if MongoDB is generating IDs
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Ensure poster_path is returned in the backend
                rating={movie.rating}
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


