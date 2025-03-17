"use client";

import React, { useState } from "react";
import RootConfigAdmin from "./RootConfigAdmin";

import AdminNavbar from "./zLayoutComponent/adminNavbar";
import AdminSidebar from "./zLayoutComponent/AdminSidebar";

const LayoutAdmin = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RootConfigAdmin>
      <div className="flex">
        <AdminSidebar
          isOpen={isOpen}
          className={`transition-all duration-300 ease-in-out transform relative top-0 left-0 h-full bg-gray-800${
            isOpen ? "w-64" : "w-14"
          }`}
        />
        <div
          className={`flex flex-col w-full transition-all duration-300 ease-in-out transform ${
            isOpen ? "pl-64" : "pl-14"
          }`}
        >
          <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} />

          <div className="mx-8 mt-5 flex-1">{children}</div>
        </div>
      </div>
    </RootConfigAdmin>
  );
};

export default LayoutAdmin;
