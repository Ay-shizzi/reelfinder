import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieGenres = () => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API_KEY;

  useEffect(() => {
    // Fetch popular movies by default
    const fetchMovies = async () => {
      let url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

      if (selectedGenre) {
        const genreIdMap = {
          action: 28,
          comedy: 35,
          romance: 10749,
          horror: 27,
        };
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIdMap[selectedGenre]}&language=en-US&page=1`;
      }

      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, [selectedGenre]);

  return (
    <div className="p-6 bg-black">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-4xl py-12 text-white">
          DISCOVER MOVIES
        </h1>
        <div className="h-1 w-[70%] bg-gradient-to-r from-red-500 to-transparent"></div>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded font-semibold ${
            selectedGenre === null ? "bg-red-300" : "bg-red-500"
          } text-white`}
          onClick={() => setSelectedGenre(null)}
        >
          Popular
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            selectedGenre === "comedy" ? "bg-red-300" : "bg-red-500"
          } text-white`}
          onClick={() => setSelectedGenre("comedy")}
        >
          Comedy
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            selectedGenre === "action" ? "bg-red-300" : "bg-red-500"
          } text-white`}
          onClick={() => setSelectedGenre("action")}
        >
          Action
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            selectedGenre === "romance" ? "bg-red-300" : "bg-red-500"
          } text-white`}
          onClick={() => setSelectedGenre("romance")}
        >
          Romance
        </button>
        <button
          className={`px-4 py-2 rounded font-semibold ${
            selectedGenre === "horror" ? "bg-red-300" : "bg-red-500"
          } text-white`}
          onClick={() => setSelectedGenre("horror")}
        >
          Horror
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link // Added Link to wrap the movie card
            key={movie.id}
            to={`/movie/${encodeURIComponent(movie.title)}`}
          >
            <div className="bg-black text-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="py-4">
                <h2 className="text-lg font-semibold">
                  {movie.title.length > 15
                    ? `${movie.title.substring(0, 15)}...`
                    : movie.title}
                </h2>
                <p className="text-sm text-gray-400">
                  Release Date:{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <p className="mt-2 text-sm">
                  {movie.overview.substring(0, 60)}...
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieGenres;
