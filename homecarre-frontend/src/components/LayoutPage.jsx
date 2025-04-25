"use client";

import React, { useState } from "react";

import RootConfig from "./RootConfig";

import Navbar from "./navbar";
import Sidebar from "./sidebar";

const LayoutPage = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RootConfig>
      <div className="h-screen w-full flex overflow-hidden bg-gray-100">
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="flex-1 flex flex-col ml-0 h-screen">
          <div className="pl-16 h-12 w-full">
            <Navbar isOpen={isOpen} />
          </div>
          <div className="mt-5 ml-24 mr-8 mb-2 h-[calc(100vh-88px)] overflow-y-auto no-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </RootConfig>
  );
};

export default LayoutPage;
