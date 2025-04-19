import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row px-6 sm:px-10 md:px-14 lg:px-20 py-12 mt-20 md:mx-10">
      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Book Appointment
        </h1>
        <p className="text-white text-lg sm:text-xl md:text-2xl mt-4">
            Many Trusted Doctors
        </p>
        <button
          onClick={() => {
            navigate('/login');
            scrollTo(0, 0);
          }}
          className="bg-white text-slate-800 hover:bg-slate-100 text-base sm:text-lg font-medium px-6 py-3 rounded-full mt-8 w-fit transition-transform duration-200 hover:scale-105 shadow-md"
        >
          Create Account
        </button>
      </div>
      <div className="hidden md:flex md:w-1/2 items-end justify-end relative">
        <img
          className="w-full max-w-sm rounded-[50px] object-contain animate-fadeInUp"
          src={assets.appointment_img}
          alt="Appointment Illustration"
        />
      </div>
    </div>
  );
};

export default Banner;
