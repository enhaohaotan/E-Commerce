import React from "react";
import { assets } from "../assets/assets";

const NavBar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between px-[4%] py-2">
      <img src={assets.logo} className="w-[max(10%,80px)]" alt="" />
      <button
        onClick={() => setToken("")}
        className={`
          rounded-full bg-gray-600 px-5 py-2 text-xs text-white
          sm:px-7 sm:text-sm
        `}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
