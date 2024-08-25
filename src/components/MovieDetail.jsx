import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API_KEY;

const MovieDetail = () => {
  const { movieName } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const searchResponse = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          movieName
        )}`
      );
      const searchData = await searchResponse.json();

      if (searchData.results.length > 0) {
        const movie = searchData.results[0];
        const detailResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`
        );
        const detailData = await detailResponse.json();
        setMovieDetails(detailData);

        // Fetch the trailer key
        const videoResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );
        const videoData = await videoResponse.json();
        const trailer = videoData.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        }

        // Fetch recommended movies
        const recommendationsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${API_KEY}&language=en-US`
        );
        const recommendationsData = await recommendationsResponse.json();
        setRecommendedMovies(recommendationsData.results.slice(0, 6)); // number of recommended movies
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
        className="h-96 object-cover"
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
        <p className="text-gray-400">
          Original Language: {movieDetails.original_language.toUpperCase()}
        </p>
        <p className="text-gray-400">
          Budget: ${movieDetails.budget.toLocaleString()}
        </p>
        <p className="text-gray-400">
          Revenue: ${movieDetails.revenue.toLocaleString()}
        </p>
        <p className="text-gray-400">Status: {movieDetails.status}</p>
        <p className="text-gray-400">
          Production Companies:{" "}
          {movieDetails.production_companies
            .map((company) => company.name)
            .join(", ")}
        </p>
        <p className="text-gray-400">
          Production Countries:{" "}
          {movieDetails.production_countries
            .map((country) => country.name)
            .join(", ")}
        </p>
        <p className="text-gray-400">
          Spoken Languages:{" "}
          {movieDetails.spoken_languages
            .map((language) => language.name)
            .join(", ")}
        </p>
        <p className="text-gray-400">Tagline: {movieDetails.tagline}</p>
        <p className="mt-4">{movieDetails.overview}</p>
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
      {recommendedMovies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white">
            Recommended Movies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
            {recommendedMovies.map((recMovie) => (
              <div key={recMovie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${recMovie.poster_path}`}
                  alt={recMovie.title}
                  className="h-64 object-cover rounded-lg"
                />
                <h3 className="mt-2 text-white">
                  {recMovie.title.length > 15
                    ? `${recMovie.title.substring(0, 15)}...`
                    : recMovie.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
