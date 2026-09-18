import React from 'react';
import logo from '../assets/logo.png';
import { Button } from '../../app/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="flex justify-between items-center p-12 py-6">
        <div>
          <Link to="/">
            <img src={logo} alt="Logo" className="h-8" />
          </Link>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Link to="/signup">
            <Button
              variant="outline"
              className="text-sm font-bold cursor-pointer"
            >
              Sign Up
            </Button>
          </Link>

          <Link to="/signin">
            <Button className="text-sm font-bold px-4 py-2 bg-black text-white rounded-lg cursor-pointer">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
