import React from "react";
import { assets } from "../assets/assets";

const NavBar = ({ setToken }) => {
  return (
    <div className="flex items-center justify-between px-[4%] py-2">
      <img src={assets.logo} className="w-[max(10%,80px)]" alt="" />
      <button
        onClick={() => setToken("")}
        className={`my-8 bg-black px-8 py-3 text-sm text-white`}
      >
        Logout
      </button>
    </div>
  );
};

export default NavBar;
