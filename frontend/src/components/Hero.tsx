import React from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';

import heroImageOne from '../assets/hero-1.png';
import heroImageTwo from '../assets/hero-2.png';

const Hero = () => {
  return (
    <React.Fragment>
      <section className="relative overflow-hidden px-12 py-4">
        <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(74,222,128,0.55),_rgba(34,197,94,0.24),_transparent_72%)] blur-3xl" />
        <div className="absolute -right-20 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(74,222,128,0.55),_rgba(34,197,94,0.24),_transparent_72%)] blur-3xl" />

        <div className="relative z-10 text-center">
          <h1>
            Turn plans into <span className="text-green-400">progress</span>
          </h1>
          <p className="text-2xl font-semibold text-gray-600">
            Organize your tasks and focus on what matters most
          </p>
        </div>

        <div className="relative z-10 flex flex-row gap-4 items-center justify-center my-8">
          <a href="/signup">
            <button className="flex flex-row gap-2 font-bold items-center px-4 py-2 bg-black text-white text-md rounded-lg cursor-pointer">
              <span>Get Started</span>
              <MdOutlineArrowOutward />
            </button>
          </a>
        </div>

        <div className="relative z-10 mx-auto mt-16 flex w-full max-w-3xl items-center justify-center">
          <img
            src={heroImageTwo}
            alt="Hero Image Two"
            className="relative z-10 w-[70%] max-w-[400px] rounded-3xl border border-white/70 bg-white p-2 shadow-[0_25px_60px_rgba(15,23,42,0.18)] rotate-[-10deg]"
          />
          <img
            src={heroImageOne}
            alt="Hero Image One"
            className="absolute right-8 top-10 z-20 w-[68%] max-w-[400px] rounded-3xl border border-white/70 bg-white p-2 shadow-[0_25px_60px_rgba(15,23,42,0.18)] rotate-[9deg]"
          />
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;
