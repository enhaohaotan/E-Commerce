import React, { useEffect } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location.pathname]);

  return showSearch && visible ? (
    <div className="border-y bg-gray-50 text-center">
      <div
        className={`
          mx-3 my-5 inline-flex w-3/4 items-center justify-center rounded-full
          border border-gray-400 px-5 py-2
          sm:w-1/2
        `}
      >
        <input
          className="flex-1 bg-inherit text-sm outline-none"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img className="w-4" src={assets.search_icon} alt="" />
      </div>
      <img
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
        alt=""
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
