import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "@/context/AuthContext";
import { FromOriginProvider } from "@/context/FromOriginContext";

const RootConfig = ({ children }) => {
  return (
    <AuthProvider>
      <AntdRegistry>
        <FromOriginProvider>{children}</FromOriginProvider>
      </AntdRegistry>
    </AuthProvider>
  );
};

export default RootConfig;
