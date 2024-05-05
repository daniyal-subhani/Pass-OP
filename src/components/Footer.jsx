import React from "react";

function Footer() {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center  w-full">
      <div>
        <div className="logo font-bold text-xl">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </div>
      </div>
      <div className="flex  justify-center  items-center">
        Created with love <img className="w-6 mx-2" src="icons/heart.png" alt="" /> By Daniyal
        Subhani
      </div>
    </div>
  );
}

export default Footer;
