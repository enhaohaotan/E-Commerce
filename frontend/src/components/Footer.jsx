import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <div
        className={`
          my-10 mt-40 flex grid-cols-[3fr_1fr_1fr] flex-col gap-14 text-sm
          sm:grid
        `}
      >
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="" />
          <p
            className={`
              w-full text-gray-600
              md:w-2/3
            `}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Deivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+1-000-000-0000</li>
            <li>contact@forever.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          Copyright © 2024 forever.com - All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
