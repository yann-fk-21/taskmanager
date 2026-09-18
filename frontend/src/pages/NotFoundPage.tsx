import { Button } from '@base-ui/react/button';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div className="flex flex-col items-center pt-20 h-screen">
        <h1 className="text-4xl font-bold text-center text-green-400">
          {' '}
          404 - Page Not Found
        </h1>
        <p className="text-center text-lg text-gray-500">
          The page you are looking for does not exist.
        </p>
        <Link to="/">
          <button className="bg-black font-semibold cursor-pointer text-white py-2 px-4 rounded-xl hover:bg-gray-800">
            Go Home
          </button>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NotFoundPage;
