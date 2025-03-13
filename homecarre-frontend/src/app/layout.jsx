"use client";

import "./globals.css";
import { usePathname } from "next/navigation";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Layout from "@/components/Layout";
import LayoutAdmin from "@/components/LayoutAdmin";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  let layout;
  if (pathname.startsWith("/admin")) {
    layout = "admin";
  } else {
    layout = "default";
  }

  return (
    <html lang="en">
      <body
        className={
          layout === "admin"
            ? ""
            : "relative h-screen w-full bg-[url(/background.svg)] bg-center bg-cover bg-repeat bg-primary"
        }
      >
        <AntdRegistry>
          {layout === "default" && <Layout>{children}</Layout>}
          {layout === "admin" && <LayoutAdmin>{children}</LayoutAdmin>}
        </AntdRegistry>
      </body>
    </html>
  );
}
