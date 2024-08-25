import React from "react";
import HeroSlider from "../components/HeroSlider";
import ComingSoonCard from "../components/ComingSoonCard";
import MovieGenres from "../components/MovieGenres";
import Search from "../components/Search";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <Search />
      <ComingSoonCard />
      <MovieGenres />
    </div>
  );
};

export default Home;
