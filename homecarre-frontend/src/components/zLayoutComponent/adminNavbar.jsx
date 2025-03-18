import React from "react";
import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";

const AdminNavbar = ({ toggleSidebar, isOpen }) => {
  return (
    <div className="flex justify-between items-center p-2 px-8 bg-gray-500 w-full text-white">
      <div className="flex items-center">
        <MenuOutlined
          className={`text-xl cursor-pointer mr-8 ${isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
          onClick={toggleSidebar}
        />
        <div
          className={`transition-all duration-300 transform ${
            isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <Image
            priority={true}
            src="/homecarre.svg"
            width={100}
            height={100}
            alt="Logo"
          />
        </div>
      </div>
      <div>
        <span className="text-lg font-semibold">Admin</span>
      </div>
    </div>
  );
};

export default AdminNavbar;
