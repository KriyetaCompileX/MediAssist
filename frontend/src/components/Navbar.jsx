import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between px-6 sm:px-10 lg:px-20 py-5 bg-white rounded-xl shadow-md mt-6 mb-8 border border-gray-200">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-36 sm:w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 items-center font-medium text-gray-700 text-sm">
        <NavLink to="/" className="hover:text-emerald-600 transition">
          HOME
        </NavLink>
        <NavLink to="/doctors" className="hover:text-emerald-600 transition">
          ALL DOCTORS
        </NavLink>
        <NavLink to="/about" className="hover:text-emerald-600 transition">
          ABOUT
        </NavLink>
        <NavLink to="/contact" className="hover:text-emerald-600 transition">
          CONTACT
        </NavLink>
      </ul>

      {/* Right Side - Auth / Menu */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative group cursor-pointer flex items-center gap-2">
            <img className="w-9 h-9 rounded-full border-2 border-emerald-500" src={userData.image} alt="User" />
            <img className="w-3" src={assets.dropdown_icon} alt="Dropdown" />
            {/* Dropdown */}
            <div className="absolute top-9 right-0 bg-white rounded-xl shadow-lg py-3 px-5 w-52 z-50 hidden group-hover:block text-sm">
              <p onClick={() => navigate('/my-profile')} className="py-2 hover:text-emerald-600 cursor-pointer">My Profile</p>
              <p onClick={() => navigate('/my-appointments')} className="py-2 hover:text-emerald-600 cursor-pointer">My Appointments</p>
              <p onClick={logout} className="py-2 hover:text-red-500 cursor-pointer">Logout</p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-green-700-500 hover:bg-green-800 text-white px-6 py-2 rounded-full font-medium hidden md:block transition-all"
          >
            Create account
          </button>
        )}

        {/* Hamburger Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full bg-white z-50 w-3/4 shadow-xl transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
          <img src={assets.logo} className="w-32" alt="Logo" />
          <img
            onClick={() => setShowMenu(false)}
            src={assets.cross_icon}
            className="w-7 cursor-pointer"
            alt="Close"
          />
        </div>
        <ul className="flex flex-col gap-5 mt-10 px-6 text-base font-medium text-gray-700">
          <NavLink onClick={() => setShowMenu(false)} to="/">HOME</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/doctors">ALL DOCTORS</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/about">ABOUT</NavLink>
          <NavLink onClick={() => setShowMenu(false)} to="/contact">CONTACT</NavLink>
          {!token ? (
            <button
              onClick={() => {
                navigate('/login');
                setShowMenu(false);
              }}
              className="bg-green-700 text-white mt-4 py-2 rounded-full"
            >
              Create account
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setShowMenu(false);
              }}
              className="text-red-500 mt-4 py-2 border-t pt-4"
            >
              Logout
            </button>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
