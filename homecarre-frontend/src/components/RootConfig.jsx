import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "@/context/AuthContext";
import { FromOriginProvider } from "@/context/FromOriginContext";
import { StatusProvider } from "@/context/initialConfigContext";

const RootConfig = ({ children }) => {
  return (
    <AuthProvider>
      <AntdRegistry>
        <StatusProvider>
          <FromOriginProvider>{children}</FromOriginProvider>
        </StatusProvider>
      </AntdRegistry>
    </AuthProvider>
  );
};

export default RootConfig;
