import React from "react";
import { PiFilmReelFill } from "react-icons/pi";

const Footer = () => {
  return (
    <div>
      <div className="bg-red-500">
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-300 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div className="flex gap-2 items-center text-white">
            <PiFilmReelFill className="w-10 h-10" />
            <h1 className="text-xl font-bold">REELFINDER</h1>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-white font-bold">
              Resources
            </div>
            <a className="my-3 block" href="/#">
              Movies
            </a>
            <a className="my-3 block" href="/#">
              Downloads
            </a>
            <a className="my-3 block" href="/#">
              Support
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-white font-bold">
              Support
            </div>
            <a className="my-3 block" href="/#">
              Help Center
            </a>
            <a className="my-3 block" href="/#">
              Privacy Policy
            </a>
            <a className="my-3 block" href="/#">
              Conditions
            </a>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-white font-bold">
              Contact us
            </div>
            <a className="my-3 block" href="/#">
              +234-806-7654-740
            </a>
            <a className="my-3 block" href="/#">
              support@email.com
            </a>
          </div>
        </div>
      </div>

      <div className="bg-red-500 pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center"
        >
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            <a href="/#" className="w-6 mx-1"></a>
            <a href="/#" className="w-6 mx-1"></a>
            <a href="/#" className="w-6 mx-1"></a>
            <a href="/#" className="w-6 mx-1"></a>
          </div>
          <div className="my-5">© Copyright 2024. All Rights Reserved.</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
