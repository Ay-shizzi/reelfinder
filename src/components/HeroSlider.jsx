import React, { useEffect, useState } from "react";
import axios from "axios";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const API_KEY = import.meta.env.VITE_REACT_APP_MOVIE_API_KEY;
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const HeroSlider = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results.slice(0, 4));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        {/* Simple Loader */}
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Slider */}
      <div className="slide-container">
        <Slide
          nextArrow={
            <button
              style={{
                background: "none",
                border: "0px",
                width: "0px",
              }}
            ></button>
          }
          prevArrow={
            <button
              style={{
                background: "none",
                border: "0px",
                width: "0px",
              }}
            ></button>
          }
        >
          {movies.map((movie, index) => (
            <div key={index}>
              <div
                className="flex items-end justify-center bg-cover bg-center h-[70vh] lg:h-[calc(100vh-4.5rem)] relative"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
              >
                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 w-full h-full bg-black bg-opacity-70"></div>
                <div className="text-white p-5 z-10 flex flex-col gap-5 md:gap-10">
                  <h3 className="text-3xl md:text-4xl font-bold">
                    {movie.title}
                  </h3>
                  <p className="text-lg md:text-xl">{movie.overview}</p>
                  <p className="text-lg">Release Date: {movie.release_date}</p>
                </div>
              </div>
            </div>
          ))}
        </Slide>
      </div>
    </div>
  );
};

export default HeroSlider;
