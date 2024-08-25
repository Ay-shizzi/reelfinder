import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Search = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className="bg-black flex justify-end pt-8">
      <form action="/search" className="max-w-[480px] w-full px-4">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            name="q"
            className="w-full border h-12 shadow p-4 rounded-full bg-transparent outline-none text-white"
            placeholder="Find a movie"
          />
          <button type="submit" onClick={handleSearch}>
            <IoSearch className="text-red-400 h-5 w-5 absolute top-3.5 right-3 fill-current" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
