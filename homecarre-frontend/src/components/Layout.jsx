"use client";

import React, { useState } from "react";
import { Row, Col } from "antd";

import RootConfig from "./RootConfig";

import Navbar from "./z_LayoutComponent/navbar";
import Sidebar from "./z_LayoutComponent/sidebar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/");

  return (
    <RootConfig>
      <Row className="h-screen w-full flex overflow-hidden">
        <Col
          span={isOpen ? 3 : 1}
          className={`transition-all duration-300 ease-in-out transform h-screen bg-gray-500 fixed top-0 left-0 z-20`}
        >
          <Sidebar
            toggleSidebar={() => setIsOpen(!isOpen)}
            isOpen={isOpen}
            onPathChange={setCurrentPath}
          />
        </Col>
        <Col
          span={isOpen ? 21 : 23}
          className={`transition-all duration-300 ease-in-out flex flex-col w-full h-screen`}
        >
          <div className="h-12 w-full">
            <Navbar isOpen={isOpen} toggleSidebar={() => setIsOpen(!isOpen)} />
          </div>
          <div className="m-5 mb-10 h-[calc(100vh-88px)] overflow-y-auto no-scrollbar">
            <div className="my-3 ml-5 text-2xl font-semibold ">
              {currentPath}
            </div>
            {children}
          </div>
        </Col>
      </Row>
    </RootConfig>
  );
};

export default Layout;
