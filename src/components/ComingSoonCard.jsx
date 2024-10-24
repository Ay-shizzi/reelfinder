import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API_KEY;

const ComingSoonCard = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [runtimes, setRuntimes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);

      data.results.forEach(async (movie) => {
        const runtimeResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
        );
        const runtimeData = await runtimeResponse.json();
        setRuntimes((prev) => ({ ...prev, [movie.id]: runtimeData.runtime }));
      });
    };

    const fetchGenres = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const data = await response.json();
      const genreMap = {};
      data.genres.forEach((genre) => {
        genreMap[genre.id] = genre.name;
      });
      setGenres(genreMap);
    };

    fetchUpcomingMovies();
    fetchGenres();
  }, []);

  const handleCardClick = (movieName) => {
    navigate(`/movie/${encodeURIComponent(movieName)}`);
  };

  return (
    <div className="bg-black p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-4xl py-12 text-white">LATEST MOVIES</h1>
        <div className="h-1 w-[70%] bg-gradient-to-r from-red-500 to-transparent"></div>
      </div>
      <div className="overflow-x-scroll no-scrollbar">
        <div className="flex gap-4">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-black w-40 md:w-56 text-white rounded-xl overflow-hidden flex-shrink-0 shadow-lg"
              onClick={() => handleCardClick(movie.title)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-60 md:h-80 object-cover"
              />
              <div className="">
                <h2 className="text-lg font-semibold">{movie.title}</h2>
                <div className=" gap-4 items-center  text-gray-400">
                  {runtimes[movie.id] !== undefined && (
                    <p className="text-sm">{runtimes[movie.id]} minutes</p>
                  )}

                  <p className="text-sm">
                    {movie.genre_ids.map((id) => genres[id]).join(", ")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonCard;
