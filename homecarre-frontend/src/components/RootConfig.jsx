import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AuthProvider } from "@/context/AuthContext";
import { UserProvider } from "@/context/userContext";

const RootConfig = ({ children }) => {
  return (
    <AuthProvider>
      {/* <UserProvider> */}
        <AntdRegistry>
          {children}
        </AntdRegistry>
      {/* </UserProvider> */}
    </AuthProvider>
  );
};

export default RootConfig;
