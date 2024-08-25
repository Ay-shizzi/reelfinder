import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "bbe8dad8f1a45a7669f747c3e9fbb8a2";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <div key={movie.id} className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4 rounded-b-lg">
            <h3 className="text-lg font-bold text-white">{movie.title}</h3>
            <p className="text-sm text-gray-300">{movie.release_date}</p>
            <p className="text-sm text-gray-400">{movie.overview}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSlider;
