import React from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="flex justify-between items-center p-12 py-6">
        <div>
          <a href="/">
            <img src={logo} alt="Logo" className="h-8" />
          </a>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <a href="/signup">
            <button className="text-sm font-bold cursor-pointer">
              Sign Up
            </button>
          </a>

          <a href="/signin">
            <button className="text-sm font-bold px-4 py-2 bg-black text-white rounded-lg cursor-pointer">
              Sign In
            </button>
          </a>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
