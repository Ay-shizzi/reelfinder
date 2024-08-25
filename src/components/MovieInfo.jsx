import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API_KEY;

const MovieInfo = () => {
  const { movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const searchResponse = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            movieName
          )}`
        );
        const searchData = searchResponse.data;

        if (searchData.results.length > 0) {
          const movie = searchData.results[0];
          const detailResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
          );
          setMovieDetails(detailResponse.data);

          const castResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}`
          );
          setCast(castResponse.data.cast);

          const recommendationsResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${API_KEY}&language=en-US`
          );
          setRecommendedMovies(
            recommendationsResponse.data.results.slice(0, 4)
          );

          // Fetch the trailer key
          const videoResponse = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
          );
          const videoData = videoResponse.data.results.find(
            (video) => video.type === "Trailer" && video.site === "YouTube"
          );
          if (videoData) {
            setTrailerKey(videoData.key);
          }
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieName]);

  if (!movieDetails) {
    return (
      <div className="flex space-x-2 justify-center items-center h-screen">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-red-500 rounded-full animate-bounce"></div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white">
      <img
        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
        alt={movieDetails.title}
        className="w-full h-auto object-cover"
      />
      <div className="mt-4">
        <h1 className="text-2xl font-semibold">{movieDetails.title}</h1>
        <p className="text-gray-400">
          Release Date:{" "}
          {new Date(movieDetails.release_date).toLocaleDateString()}
        </p>
        <p className="text-gray-400">Runtime: {movieDetails.runtime} minutes</p>
        <p className="text-gray-400">
          Genres: {movieDetails.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p className="text-gray-400">Popularity: {movieDetails.popularity}</p>
        <p className="text-gray-400">
          Original Language: {movieDetails.original_language}
        </p>
        <p className="text-gray-400">
          Vote Average: {movieDetails.vote_average}
        </p>
        <p className="text-gray-400">Vote Count: {movieDetails.vote_count}</p>
        <p className="text-gray-400">Overview: {movieDetails.overview}</p>

        <h2 className="text-xl font-semibold text-white mt-8">Cast</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {cast.map((actor) => (
            <p key={actor.id}>{actor.name}</p>
          ))}
        </div>
      </div>

      {/* YOUTUBE TRAILER */}
      {trailerKey && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">Watch Trailer</h2>
          <div className="mt-4">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailerKey}`}
              title="YouTube trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-48 md:w-[45rem] md:h-[30rem]"
            ></iframe>
          </div>
        </div>
      )}

      {/* RECOMMENDED MOVIES */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white">Recommended Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {recommendedMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900 text-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-400">
                  Release Date:{" "}
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
