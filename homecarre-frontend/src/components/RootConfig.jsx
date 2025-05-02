import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "@/context/AuthContext";

const RootConfig = ({ children }) => {
  return (
    <AuthProvider>
      <AntdRegistry>
        {children}
      </AntdRegistry>
    </AuthProvider>
  );
};

export default RootConfig;
