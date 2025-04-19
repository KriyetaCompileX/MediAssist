import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-teal-400 to-emerald-500 text-white rounded-3xl px-6 sm:px-10 lg:px-20 overflow-hidden shadow-xl mt-10">

      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col gap-6 py-12 md:py-24 md:pl-4 lg:pl-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
          Smarter Scheduling <br /> Faster Care, Better Outcomes
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 text-white text-sm font-light">
          {/* <img className="w-24 sm:w-28" src={assets.group_profiles} alt="Users" /> */}
          <p className="leading-relaxed">
            Quickly browse our trusted doctors and <br className="hidden sm:block" />
            schedule appointments stress-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="inline-flex items-center gap-2 bg-white text-teal-600 text-sm font-medium px-6 py-3 rounded-full shadow hover:scale-105 transition-all duration-300 w-fit"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 relative mt-8 md:mt-0">
        <img
          className="w-30 h-30 right-0 rounded-2xl drop-shadow-lg"
          src={assets.header_img}
          alt="Header Visual"
        />
      </div>
    </header>
  );
};

export default Header;
