import "./globals.css";

import "@ant-design/v5-patch-for-react-19";
import { Suspense } from "react";
import LayoutPage from "@/components/layout/LayoutPage";
import GlobalLoading from "./loading-ui";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Suspense fallback={<GlobalLoading />}>
          <LayoutPage>{children}</LayoutPage>
        </Suspense>
      </body>
    </html>
  );
}
