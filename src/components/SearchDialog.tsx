import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSearchResults,
  setGender,
  setQuery,
  setStatus,
  setType,
} from "../features/searchSlice";
import { AppDispatch, RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchDialog = () => {
  const [active, setActive] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const searchState = useSelector((state: RootState) => state.search);
  const previousQuery = useRef<{
    query: string;
    status: string;
    gender: string;
    type: string;
  }>({
    query: "",
    status: "",
    gender: "",
    type: "character",
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const { query, status, gender, type } = searchState;
    if (
      (query && query !== previousQuery.current.query) ||
      (status && status !== previousQuery.current.status) ||
      (gender && gender !== previousQuery.current.gender) ||
      (type && type !== previousQuery.current.type)
    ) {
      previousQuery.current = { query, status, gender, type };
      dispatch(fetchSearchResults({ query, status, gender, type }));
      if (location.pathname !== "/search") navigate("/search");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      ref={searchRef}
      className="absolute z-10 top-2 shadow-md bg-slate-100 px-4 rounded-3xl left-[50%] -translate-x-1/2 w-fit right-0"
    >
      {/* <select
        className="bg-transparent text-slate-600 px-1 py-2 border-r-[16px] border-transparent text-sm outline-none cursor-pointer"
        title="Select Type"
        name="type"
        id="select-type"
        onChange={(e) => dispatch(setType(e.target.value))}
      >
        <option value="character">Characters</option>
        <option value="episode">Episodes</option>
        <option value="location">Locations</option>
      </select> */}
      <div className="flex  items-center">
        <input
          onFocus={() => setActive(true)}
          onChange={(e) => dispatch(setQuery(e.target.value))}
          onKeyDown={handleKeyDown}
          className="outline-none border-none focus:border-none focus:outline-none bg-transparent w-[400px] h-[50px]"
          placeholder="Search for your favourite character.."
          type="text"
        />
        <FiSearch onClick={handleSearch} className="cursor-pointer" />
      </div>
      {active && (
        <div className="flex flex-col items-center w-full transition-transform ease-in delay-500">
          <div className="flex w-full flex-col gap-2 p-2">
            <p className="text-sm font-thin">Filters</p>
            <div className="flex flex-row gap-2 px-2 pb-2">
              <select
                className="bg-slate-200 px-2 rounded-xl text-slate-600 py-1 border-r-[16px] border-transparent text-sm outline-none cursor-pointer"
                title="Select Status"
                id="select-status"
                name="select-status"
                value={searchState.status}
                onChange={(e) => dispatch(setStatus(e.target.value))}
              >
                <option value="none">None</option>
                <option value="alive">Alive</option>
                <option value="dead">Dead</option>
                <option value="unknown">Unknown</option>
              </select>
              <select
                className="bg-slate-200 px-2 rounded-xl text-slate-600 py-1 border-r-[16px] border-transparent text-sm outline-none cursor-pointer"
                title="Select Gender"
                id="select-gender"
                name="select-gender"
                value={searchState.gender}
                onChange={(e) => dispatch(setGender(e.target.value))}
              >
                <option value="none">None</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDialog;
