"use client";

import React, { useState } from "react";
import { Row, Col } from "antd";

import RootConfigAdmin from "./RootConfigAdmin";

import AdminNavbar from "./zLayoutComponent/adminNavbar";
import AdminSidebar from "./zLayoutComponent/AdminSidebar";

const LayoutAdmin = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RootConfigAdmin>
      <Row className="h-screen w-full flex">
        <Col
          span={isOpen ? 3 : 1}
          className={`transition-all duration-300 ease-in-out transform h-full bg-gray-800 fixed top-0 left-0`}
        >
          <AdminSidebar toggleSidebar={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </Col>
        <Col span={isOpen ? 21 : 23} className={`transition-all duration-300 ease-in-out flex flex-col w-full`}>
          <AdminNavbar toggleSidebar={() => setIsOpen(!isOpen)} isOpen={isOpen} />

          <div className="mx-8 mt-5 flex-1">{children}</div>
        </Col>
      </Row>
    </RootConfigAdmin>
  );
};

export default LayoutAdmin;
