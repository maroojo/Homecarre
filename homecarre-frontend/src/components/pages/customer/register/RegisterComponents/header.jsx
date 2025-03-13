import React from "react";
import Image from "next/image";

const Header = ({ fullname }) => {
  return (
    <div className="flex flex-col p-4 my-6 gap-y-3 items-center text-center  text-white">
      <div className="text-2xl font-semibold">Welcome</div>
      <div className={fullname ? "visible" : "hidden"}>{fullname}</div>
      <div className="text-xl font-semibold">to</div>
      <Image src={"/homecarre.svg"} alt="logo" width={200} height={200} />
    </div>
  );
};

export default Header;
