/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import './Search.css';

const URL=import.meta.env.VITE_BACKEND_URL
const API_URL = `${URL}search`;  

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const query = location.state?.query || '';
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [searchQuery, setSearchQuery] = useState(query);  

  // Fetch genres
  useEffect(() => {
    fetch(`${URL}genre`)
      .then((response) => response.json())
      .then((data) => {
        const genreMap = data.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genreMap);
      })
      .catch((error) => console.error('Error fetching genres:', error));
  }, []);

  // Fetch movies based on the query and genres
  useEffect(() => {
    if (searchQuery) {
      fetch(`${API_URL}?query=${searchQuery}`)
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.movies);
        })
        .catch((error) => console.error('Error fetching search data:', error));
    }
  }, [searchQuery]);

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    
    navigate({ pathname: '/search', state: { query: event.target.value } });  
  };

  return (
    <div className="search-page">
      <h2>Showing Results for: {searchQuery}</h2>
      <div className="movie-grid">
        {movies.length > 0 ? (
          movies.map((movie) => {
            const movieGenres = movie.genre_ids.map((id) => genres[id] || 'Unknown');
            return (
              <MovieCard
                key={movie.id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
                genres={movieGenres}
              />
            );
          })
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;

