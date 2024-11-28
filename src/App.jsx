import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import "./App.css";
import Genre from "./components/Genre";
import Search from "./components/Search";
import Trending from "./components/Trending";
import Graph from "./components/Graph";
import MoviDetail from "./components/MovieDetail";
import Recommendation from "./components/Recommendation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../src/redux/MovieSlice";
import Papa from "papaparse";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const dispatch = useDispatch();
  const isMoviesLoaded = useSelector((state) => state.movie.isMoviesLoaded);

  useEffect(() => {
    if (!isMoviesLoaded) {
      const loadCSV = async (fileName) => {
        return new Promise((resolve, reject) => {
          Papa.parse(`/${fileName}`, {
            download: true,
            header: true,
            complete: (result) => resolve(result.data),
            error: (error) => reject(error),
          });
        });
      };

      const loadAllMovies = async () => {
        try {
          const movieData = await loadCSV("movies_with_image_links.csv");
          const reviewData = await loadCSV("generated_movie_reviews.csv");
          const movielink = await loadCSV("movies.csv");

          const movieMap = new Map();
          movieData.forEach((movie) => {
            movieMap.set(movie.movieId, { ...movie });
          });

          reviewData.forEach((review) => {
            const movieId = review.movieId;
            if (movieMap.has(movieId)) {
              movieMap.set(movieId, { ...movieMap.get(movieId), ...review });
            }
          });

          movielink.forEach((link) => {
            const movieId = link.movieId;
            if (movieMap.has(movieId)) {
              movieMap.set(movieId, { ...movieMap.get(movieId), ...link });
            }
          });

          dispatch(setMovies([...movieMap.values()]));
        } catch (error) {
          console.error("Error loading CSV files:", error);
        }
      };
      console.log("loaded recommend")
      loadAllMovies();
    }
  }, [dispatch, isMoviesLoaded]);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/genre" element={<Genre />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/trending" element={<Trending />}></Route>
        <Route path="/trending/graph" element={<Graph />} />
        <Route path="/recommendation" element={<ProtectedRoute><Recommendation /></ProtectedRoute>}></Route>
        <Route
          path="/recommendation/:movieTitle"
          element={<MoviDetail />}
        ></Route>
      </Routes>
    </Router>
  );
};

export default App;
