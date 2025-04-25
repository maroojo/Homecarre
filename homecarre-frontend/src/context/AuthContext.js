import React, { createContext, useContext, useState, useEffect } from "react";
import { parseCookies, destroyCookie } from "nookies";
import LoginModal from "@pages/_modals/LoginModal";
import AdminService from "@/services/admin/AuthService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const login = (token, user_id, user_name, user_fullname, user_auth) => {
    setUser({ user_id, user_name, user_fullname, user_auth });
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  const logout = () => {
    destroyCookie(null, "user_id");
    destroyCookie(null, "laravel_session");
    setUser(null);
    setIsAuthenticated(false);
    setIsModalOpen(true);
  };
  const {
    Login: loginService,
    Logout: logoutService,
    checkUser,
  } = AdminService(login, logout);

  useEffect(() => {
    const cookies = parseCookies();
    const id = cookies.user_id;

    if (id) {
      checkUser(id).then((res) => {
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
    return () => window.removeEventListener("session-expired", handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        Login: loginService,
        Logout: logoutService,
        loading,
        user,
      }}
    >
      {children}
      {isModalOpen && <LoginModal />}
    </AuthContext.Provider>
  );
};
