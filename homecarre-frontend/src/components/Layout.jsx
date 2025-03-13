import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./zLayoutComponent/navbar";
import RootConfig from "./RootConfig";

const Layout = ({ children }) => {
  const pathname = usePathname();

  let layout;
  if (pathname.startsWith("/register")) {
    layout = "register";
  } else {
    layout = "default";
  }

  const pathSegment = pathname.split("/").filter(Boolean)[0] || "home";

  return (
    <RootConfig>
      <Navbar menu={layout} currentPage={pathSegment} />
      <div>{children}</div>
    </RootConfig>
  );
};

export default Layout;
