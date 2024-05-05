import React from "react";

function Navbar() {
  return (
    <nav className="bg-slate-800 text-white px-2 md:px-12">
      <div className="mycontainer flex justify-between px-4 items-center py-5 h-14">
        <div className="logo font-bold text-xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
        {/* <ul className="">
          <li className="flex  gap-4 ">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="#">
              About
            </a>
            <a className="hover:font-bold" href="#">
              Contact
            </a>
          </li>
        </ul> */}
        <button className="text-white flex justify-between  m-4 items-center bg-green-700 rounded-full ring-white ring-1">
          <img
            className="invert p-1  w-10"
            src="icons/github.svg"
            alt="github logo"
          />
          <span className="font-bold px-2">Github</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
