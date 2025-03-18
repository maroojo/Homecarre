"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname() || "/admin";

  const items = [
    {
      key: "/admin",
      icon: <HomeOutlined />,
      label: isOpen ? "Homecarre" : null,
    },
    {
      key: "/admin/request",
      icon: <DesktopOutlined />,
      label: isOpen ? "Repair Request" : null,
    },
    {
      key: "/admin/payment",
      icon: <ContainerOutlined />,
      label: isOpen ? "Payment" : null,
    },
    {
      key: "/admin/client",
      icon: <UserOutlined />,
      label: isOpen ? "Client Account" : null,
    },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  return (
    <div className="w-full">
      <div className={`p-2 flex justify-between items-center relative text-white`}>
        <div
          className={`transition-all duration-300 transform ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 h-8"
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
        <MenuOutlined
          className={`text-xl cursor-pointer ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
          onClick={toggleSidebar}
        />
      </div>
      <nav>
        <Menu
          mode="inline"
          theme="dark"
          className={`items-center transition-all duration-300 ${
            isOpen ? "w-64" : "w-16"
          }`}
          items={items}
          defaultSelectedKeys={["/admin"]}
          selectedKeys={[pathname]}
          onClick={(e) => router.push(e.key)}
        />
      </nav>
      <div className="fixed bottom-2 mb-2 w-full bg-white">
        <Button
          type="link"
          block
          icon={<LogoutOutlined />}
          className="rounded-none bg-gray-200 text-white"
          onClick={handleLogout}
        >
          {isOpen ? "Log Out" : ""}
        </Button>
      </div>
    </div>
  );
};
export default AdminSidebar;
