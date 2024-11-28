// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import MovieCard from "./MovieCard";
// import "./Trending.css";

// const API_KEY = import.meta.env.VITE_API_KEY;
// const BASE_TRENDING_API_URL = `https://api.themoviedb.org/3/trending/movie`;
// const GENRES_API_URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;

// const Trending = () => {
//   const [trendingMovies, setTrendingMovies] = useState([]);
//   const [genres, setGenres] = useState({});
//   const [timeRange, setTimeRange] = useState("day");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch(GENRES_API_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         const genreMap = {};
//         data.genres.forEach((genre) => {
//           genreMap[genre.id] = genre.name;
//         });
//         setGenres(genreMap);
//       })
//       .catch((error) => console.error("Error fetching genres:", error));
//   }, []);

//   useEffect(() => {
//     const fetchTrendingMovies = async () => {
//       const url = `${BASE_TRENDING_API_URL}/${timeRange}?api_key=${API_KEY}&include_adult=false`;
//       fetch(url)
//         .then((response) => response.json())
//         .then((data) => {
//           const sortedMovies = data.results.sort(
//             (a, b) => b.popularity - a.popularity
//           );
//           setTrendingMovies(sortedMovies);
//         })
//         .catch((error) =>
//           console.error("Error fetching trending movies:", error)
//         );
//     };

//     fetchTrendingMovies();
//   }, [timeRange]);

//   const handlegraph = () => {
//     navigate("/trending/graph");
//   };

//   return (
//     <div id="trending">
//       <h1>Trending Movies</h1>
//       <div className="trend-btn">
//         <button
//           onClick={handlegraph}
//           style={{ marginRight: "200px" }}
//           className="check-genre-btn"
//         >
//           Checkout Genre Trends
//         </button>

//         <div className="time-range-buttons">
//           <button
//             className={timeRange === "day" ? "active" : ""}
//             onClick={() => setTimeRange("day")}
//           >
//             Today
//           </button>
//           <button
//             className={timeRange === "week" ? "active" : ""}
//             onClick={() => setTimeRange("week")}
//           >
//             This Week
//           </button>
//         </div>
//       </div>
//       <div className="movie-grid">
//         {trendingMovies
//           .filter((movie) => !movie.adult)
//           .map((movie) => (
//             <MovieCard
//               key={movie.id}
//               title={movie.title}
//               imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               rating={movie.vote_average}
//               genres={movie.genre_ids.map((id) => genres[id])}
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default Trending;

/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MovieCard from "./MovieCard";
import "./Trending.css";

const BASE_TRENDING_API_URL = "http://localhost:3000/movies"; // Update this to your backend API URL

const Trending = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [timeRange, setTimeRange] = useState("day"); // "day" or "week"
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch genres from your backend
    fetch(`${BASE_TRENDING_API_URL}/genre`)
      .then((response) => response.json())
      .then((data) => {
        const genreMap = {};
        data.forEach((genre) => {
          genreMap[genre.id] = genre.name; // Assuming your backend returns genres with 'id' and 'name'
        });
        setGenres(genreMap);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, []);

  useEffect(() => {
    // Fetch trending movies based on the selected time range
    const fetchTrendingMovies = async () => {
      const endpoint =
        timeRange === "day"
          ? `${BASE_TRENDING_API_URL}/trendingtoday`
          : `${BASE_TRENDING_API_URL}/trendingthisweek`;

      fetch(endpoint)
        .then((response) => response.json())
        .then((data) => {
          setTrendingMovies(data);
        })
        .catch((error) =>
          console.error("Error fetching trending movies:", error)
        );
    };

    fetchTrendingMovies();
  }, [timeRange]);

  const handlegraph = () => {
    navigate("/trending/graph");
  };

  return (
    <div id="trending">
      <h1>Top Trending Movies {timeRange==="day"? "Today" :"This Week"}</h1>
      <div className="trend-btn">
        <button
          onClick={handlegraph}
          style={{ marginRight: "200px" }}
          className="check-genre-btn"
        >
          Checkout Genre Trends
        </button>

        <div className="time-range-buttons">
          <button
            className={timeRange === "day" ? "active" : ""}
            onClick={() => setTimeRange("day")}
          >
            Today
          </button>
          <button
            className={timeRange === "week" ? "active" : ""}
            onClick={() => setTimeRange("week")}
          >
            This Week
          </button>
        </div>
      </div>
      <div className="movie-grid">
        {trendingMovies
          .filter((movie) => !movie.adult)
          .map((movie) => (
            <MovieCard
              key={movie._id} // MongoDB uses _id as the unique identifier
              title={movie.title}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Ensure the backend provides 'poster_path'
              rating={movie.vote_average}
              genres={movie.genre_ids.map((id) => genres[id])}
            />
          ))}
      </div>
    </div>
  );
};

export default Trending;
