import "./globals.css";

import "@ant-design/v5-patch-for-react-19";
import LayoutPage from "@/components/layout/LayoutPage";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutPage>{children}</LayoutPage>
      </body>
    </html>
  );
}
