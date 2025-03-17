"use client";

import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Menu } from "antd";

const AdminSidebar = ({ isOpen }) => {
  const router = useRouter();
  const pathname = usePathname() || "/admin";

  const items = [
    {
      key: "/admin",
      icon: <HomeOutlined />,
      label: "Homecarre",
      onClick: () => router.push("/admin"),
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "Option 2",
    },
    {
      key: "3",
      icon: <ContainerOutlined />,
      label: "Option 3",
    },
    {
      key: "4",
      icon: <UserOutlined />,
      label: "Client Account",
      onClick: () => router.push("/admin/client"),
    },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-600 text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-14"
      }`}
    >
      <div className="p-2 flex justify-between items-center">
        <Image
          src={"/icon.svg"}
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span
          className={`${
            isOpen ? "visible" : "hidden"
          } transition-all duration-300`}
        >
          homecarre
        </span>
      </div>
      <nav>
        <Menu
          mode="inline"
          theme="dark"
          className={`transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`}
          items={items}
          defaultSelectedKeys={["1"]}
          selectedKeys={[pathname]}
        />
      </nav>
    </div>
  );
};
export default AdminSidebar;
