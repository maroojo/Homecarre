import React from "react";
import useLayout from "@hooks/useLayout";
import RootConfigAdmin from "./RootConfigAdmin";

import AdminNavbar from "./zLayoutComponent/adminNavbar";
import AdminSidebar from "./zLayoutComponent/adminSidebar";

const LayoutAdmin = ({ children }) => {
  const { hide } = useLayout();

  return (
    <RootConfigAdmin>
      {hide ? "" : 
      <div>
        <AdminNavbar />
        <AdminSidebar />
      </div>
      }
      {children}
    </RootConfigAdmin>
  );
};

export default LayoutAdmin;
