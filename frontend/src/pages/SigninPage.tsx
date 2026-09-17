import React from 'react';
import logo from '../assets/logo.png';

const SigninPage = () => {
  return (
    <React.Fragment>
      <div className="absolute -left-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(74,222,128,0.55),_rgba(34,197,94,0.24),_transparent_72%)] blur-3xl" />
      <div className="absolute -right-0 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(74,222,128,0.55),_rgba(34,197,94,0.24),_transparent_72%)] blur-3xl" />
      <div className="flex flex-col justify-start items-center h-screen py-12">
        <div>
          <a href="/">
            <img src={logo} alt="Logo" className="h-12" />
          </a>
        </div>

        <div className="space-y-2 mt-6">
          <h2 className="text-4xl font-bold text-center">Welcome Back.</h2>
          <p className="text-center text-lg">
            New to Task Manager?{' '}
            <a href="/signup" className="underline font-bold">
              Sign up
            </a>
          </p>
        </div>

        <form className="flex flex-col gap-4 mt-6 w-2/5">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-6 py-2 rounded-xl bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-gray-600"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-6 py-2 rounded-xl bg-gray-100 border-2 border-gray-300 focus:outline-none focus:border-gray-600"
          />

          <button className="w-full py-2 px-6 bg-black text-white rounded-xl">
            Sign In
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SigninPage;
