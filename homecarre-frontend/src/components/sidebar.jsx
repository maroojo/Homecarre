"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import AdminService from "@/services/admin/AuthService";
import "./layout.css";

import { LogoutOutlined } from "@ant-design/icons";
import { Button, Menu } from "antd";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faScrewdriver,
  faMoneyBillTransfer,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { islogout } = AdminService();

  const items = [
    {
      key: "/",
      icon: <FontAwesomeIcon icon={faHouse} style={{ fontSize: "24px" }} />,
      label: isOpen ? <span>Homecarre</span> : "",
      onClick: () => {
        router.push("/");
      },
    },
    {
      key: "/request",
      icon: (
        <FontAwesomeIcon icon={faScrewdriver} style={{ fontSize: "26px" }} />
      ),
      label: isOpen ? <span>Repair Request</span> : "",
      onClick: () => {
        router.push("/request");
      },
    },
    {
      key: "/payment",
      icon: (
        <FontAwesomeIcon
          icon={faMoneyBillTransfer}
          style={{ fontSize: "22px" }}
        />
      ),
      label: isOpen ? <span>Payment</span> : "",
      onClick: () => {
        router.push("/payment");
      },
    },
    {
      key: "/client",
      icon: <FontAwesomeIcon icon={faUser} style={{ fontSize: "28px" }} />,
      label: isOpen ? <span className="ml-1">Client Account</span> : "",
      onClick: () => {
        router.push("/client");
      },
    },
  ];

  const handleLogout = async () => {
    try {
      const response = await islogout();
      if (response) {
        router.push("/");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 z-30 h-screen bg-wild-strawberry-500 text-white
      transition-all duration-300 ease-in-out 
      ${isOpen ? "w-48" : "w-16"}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex flex-col justify-between h-[calc(100vh-50px)]">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-13 transition-all duration-300">
            <Image
              priority={true}
              src="/homecarre.svg"
              width={100}
              height={100}
              alt="Logo"
              className={`transition-all duration-100 transform ${
                isOpen ? " h-9" : " h-5"
              }`}
            />
          </div>
          <div className="mt-5 w-full">
            <Menu
              mode="inline"
              style={{
                backgroundColor: "transparent",
              }}
              items={items}
              defaultSelectedKeys={["/"]}
              selectedKeys={[pathname]}
            />
          </div>
        </div>
      </div>
      <Button
        type="text"
        block
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        style={{
          fontWeight: 500,
          width: "100%",
        }}
        className="square-btn"
      >
        {isOpen ? "Log Out" : ""}
      </Button>
    </div>
  );
};

export default Sidebar;
