import React from "react";
import { IoSearch } from "react-icons/io5";
import { PiFilmReelFill } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between bg-black bg-opacity-50 text-white z-50 border-b-2 border-b-red-600">
        <Link to="/">
          <div className="flex gap-2 items-center">
            <PiFilmReelFill className="w-10 h-10" />
            <h1 className="text-xl font-bold">REELFINDER</h1>
          </div>
        </Link>
        <div className="items-center gap-8 hidden md:flex">
          <a href="#">Home</a>
          <a href="#">Schedule</a>
          <a href="#">Movies</a>
          <a href="#">News</a>
          <a className="flex items-center" href="#">
            <IoSearch />
          </a>
          <button
            className="bg-red-500 p-2 rounded-md cursor-pointer hover:bg-red-700"
            href="#"
          >
            Sign In
          </button>
        </div>
        <div className="flex md:hidden items-center text-2xl">
          <RxHamburgerMenu />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
