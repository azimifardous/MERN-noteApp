import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onChange, value }) => {
  return (
    <nav className="absolute mt-4 right-1/3 translate-x-1/3 max-md:w-1/2 w-2/4 ">
      <div className="absolute inset-y-0 text-customRed left-0 flex items-center pl-3 pointer-events-none">
        <FontAwesomeIcon icon={faSearch} />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.currentTarget.value)}
        id="default-search"
        className="block w-full p-4 pl-10 placeholder:font-pacifico text-sm text-customGray border border-gray-400 rounded-lg bg-gray-50 focus:ring-customRed focus:border-customRed"
        placeholder="Search..."
        required
      />
    </nav>
  );
};

export default SearchBar;
