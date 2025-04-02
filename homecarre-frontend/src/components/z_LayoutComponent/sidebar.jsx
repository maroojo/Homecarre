"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import AdminService from "@/services/admin/AuthService";

import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const router = useRouter();
  const pathname = usePathname() || "/";
  const { islogout } = AdminService();

  const items = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: isOpen ? "Homecarre" : <HomeOutlined />,
      onClick: () => router.push("/"),
    },
    {
      key: "/request",
      icon: <DesktopOutlined />,
      label: isOpen ? "Repair Request" : <DesktopOutlined />,
      onClick: () => router.push("/request"),
    },
    {
      key: "/payment",
      icon: <ContainerOutlined />,
      label: isOpen ? "Payment" : <ContainerOutlined />,
      onClick: () => router.push("/payment"),
    },
    {
      key: "/client",
      icon: <UserOutlined />,
      label: isOpen ? "Client Account" : <UserOutlined />,
      onClick: () => router.push("/client"),
    },
  ];

  const handleLogout = async() => {
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
    <div className="w-full">
      <div className="p-2 flex justify-between items-center text-white">
        <div
          className={`transition-all duration-500 transform h-9 ${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
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
          className="text-xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>

      <nav>
        <Menu
          mode="inline"
          theme="dark"
          className={`transition-all duration-500 ${isOpen ? "w-64" : "w-16"}`}
          items={items}
          defaultSelectedKeys={["/"]}
          selectedKeys={[pathname]}
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

export default Sidebar;
