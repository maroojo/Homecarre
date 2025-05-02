import React, { createContext, useContext, useState, useEffect } from "react";
import LoginModal from "@/components/modules/loginModal/LoginModal";
import { authentication, loginService, logoutService } from "@/services/Auth";
import { parseCookies } from "nookies";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await loginService(username, password);
    if (res) {
      setIsAuthenticated(true);
      setUser(res);
      setIsModalOpen(false);
    }
    return res;
  };

  const logout = async() => {
    await logoutService();
    setIsAuthenticated(false);
    setUser(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    const cookies = parseCookies();
    const id = cookies.user_id;

    if (id) {
      authentication(id).then((res) => {
        if (res) {
          setIsAuthenticated(true);
          setUser(res.result);
        } else {
          setIsAuthenticated(false);
          setIsModalOpen(true);
        }
        setLoading(false);
      });
    } else {
      setIsModalOpen(true);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleSessionExpired = () => {
      setIsAuthenticated(false);
      setUser(null);
      setIsModalOpen(true);
    };

    window.addEventListener("session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("session-expired", handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
        user,
      }}
    >
      {children}
      {isModalOpen && <LoginModal />}
    </AuthContext.Provider>
  );
};
