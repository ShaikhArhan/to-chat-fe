import React, { useCallback } from "react";
import "./Search.css";
import search_icon from "../../assets/image/search_icon.png";
import { debounce } from "../../utils/debounce";
export const Search = ({ onSearchChange }) => {
  const debouncedSearch = useCallback(debounce(onSearchChange, 500), []);
  return (
    <div className="search-container">      
      <input
        className="search_input"
        type="search"
        onChange={(e) => {
          debouncedSearch(e.target.value);
        }}
      ></input>
      <img className="search_icon" src={search_icon} alt="search_icon" />
    </div>
  );
};
