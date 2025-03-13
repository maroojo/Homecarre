import React from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "./sidebar";

const Navbar = ({ menu, currentPage }) => {
  const outline = "flex justify-between items-center";

  return (
    <nav className="bg-white/10 p-2">
      {menu === "register" && (
        <div className={`${outline}`}>
          <div className="text-2xl font-bold text-white">Register</div>
          <div className="flex items-center">
            <Image
              src="/IMG_03661.JPG"
              alt="user Image"
              width={100}
              height={100}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      )}
      {menu === "default" && (
        <div className={`${outline}`}>
          <Sidebar />
          <div className="text-white text-2xl capitalize">
            {currentPage == "home" ? "homecarre" : currentPage}
          </div>
          <div className="flex items-center">
            <Image
              src="/IMG_03661.JPG"
              alt="user Image"
              width={100}
              height={100}
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
