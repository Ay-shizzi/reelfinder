import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API_KEY;

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const searchMovies = async () => {
      if (query) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
          );
          setMovies(response.data.results);
        } catch (error) {
          console.error("Error searching movies:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    searchMovies();
  }, [query]);

  return (
    <section className="container text-white p-4">
      <div>
        <h1 className="text-2xl py-8">Search Results</h1>
      </div>

      {loading ? (
        <div className="flex space-x-2 justify-center items-center h-screen">
          <span className="sr-only">Loading...</span>
          <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <Link
              to={`/movie/${encodeURIComponent(movie.title)}`}
              className="movie-list"
              key={movie.id}
            >
              <img
                className="list-img"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`Poster of ${movie.title}`}
              />
              <p className="movie-title">
                {movie.title.length > 20
                  ? `${movie.title.substring(0, 20)}...`
                  : movie.title}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
