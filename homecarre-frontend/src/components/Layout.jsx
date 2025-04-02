"use client";

import React, { useState } from "react";
import { Row, Col } from "antd";

import RootConfig from "./RootConfig";
import { useAuth } from "@/context/AuthContext";

import Navbar from "./z_LayoutComponent/navbar";
import Sidebar from "./z_LayoutComponent/sidebar";
import LoginModal from "@admin/_modals/LoginModal";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

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
          />
        </Col>
        <Col
          span={isOpen ? 21 : 23}
          className={`transition-all duration-300 ease-in-out flex flex-col w-full h-screen`}
        >
          <div className="h-12 w-full">
            <Navbar isOpen={isOpen} />
          </div>
          <div className="m-5 mb-10 h-[calc(100vh-88px)] overflow-y-auto no-scrollbar">
            {children}
          </div>
        </Col>
      </Row>
    </RootConfig>
  );
};

export default Layout;
