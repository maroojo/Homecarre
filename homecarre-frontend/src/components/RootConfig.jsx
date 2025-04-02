import { AuthProvider } from "@/context/AuthContext";

const RootConfig = ({ children }) => {
  return (  
    <AuthProvider>
      {children}
    </AuthProvider>
  );
};

export default RootConfig;
