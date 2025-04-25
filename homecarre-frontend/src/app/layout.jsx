import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@ant-design/v5-patch-for-react-19";
import LayoutPage from "@/components/LayoutPage";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <LayoutPage>{children}</LayoutPage>
        </AntdRegistry>
      </body>
    </html>
  );
}
