"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Navbar = ({ isOpen }) => {
  const pathname = usePathname();
  const { user } = useAuth();
  const firstPath = pathname?.split("/")[1] || "home";

  return (
    <div className="flex justify-between items-center p-2 px-8 bg-withe w-full text-wild-strawberry-600 shadow-lg">
      <div className="flex items-center">
        <div
          className={`text-xl font-semibold transition-all duration-300 transform ${
            isOpen ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          {firstPath === "home"
            ? "Homecarre"
            : firstPath.charAt(0).toUpperCase() + firstPath.slice(1)}
        </div>
      </div>
      <div>
        {user ? (
          <div className="flex items-end gap-4">
            <div className="text-xs font-light pb-0.5">{user.name}</div>
            <div className="text-2xl font-semibold uppercase">{user.role}</div>
          </div>
        ) : (
          <span className="text-lg font-semibold ">Admin</span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
