import React, { createContext, useContext, useState, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import LoginModal from "@admin/_modals/LoginModal";
import AdminService from "@/services/admin/AuthService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { checkUser } = AdminService();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.token;
    console.log("token in context",token)

    if (token) {
      checkUser(token).then((response) => {
        console.log("Check User Response:", response)
        if (response) {
          setIsAuthenticated(true);
          setUser(response.result);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
    } else {
      setIsModalOpen(true);
      setLoading(false);
    }

    setLoading(false);
  }, [checkUser]);

  const login = (token, user_id, user_name, user_fullname, user_auth) => {
    setCookie(null, "token", token, { path: "/" });
    setUser({ user_id, user_name, user_fullname, user_auth });
    setIsAuthenticated(true);
    setIsModalOpen(false);
  };

  const logout = () => {
    destroyCookie(null, "token");
    setUser(null);
    setIsAuthenticated(false);
    setIsModalOpen(true);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, user }}
    >
      {children}
      {isModalOpen && <LoginModal />}
    </AuthContext.Provider>
  );
};
