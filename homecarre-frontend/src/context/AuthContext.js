"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
const LoginModal = dynamic(() => import("@modules/loginModal/LoginModal"), {
  ssr: false,
});
import { hcAuthentication } from "@/services";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { authentication, loginService, logoutService } = hcAuthentication;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const handleSessionExpired = () => {
    // setIsAuthenticated(false);
    setUser(null);
    setIsModalOpen(true);
  };

  const getUserFromCookie = () => {
    const userInfoCookie = Cookies.get("userInfo");
    if (userInfoCookie) {
      try {
        const userInfo = JSON.parse(userInfoCookie);
        setUser(userInfo);
      } catch (err) {
        console.error("Failed to parse userInfo cookie:", err);
      }
    } else {
      setUser(null);
    }
  };

  const checkLoginStatus = async () => {
    try {
      await authentication();
    } catch (err) {
      console.error("Error checking login status:", err);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const login = async (body) => {
    try {
      const res = await loginService(body);
      if (res?.success) {
        // setIsAuthenticated(true);
        getUserFromCookie();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
    // return res;
  };

  const logout = async () => {
    try {
      await logoutService();
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      // setIsAuthenticated(false);
      setUser(null);
      Cookies.remove("userInfo");
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    // checkLoginStatus();
  }, [user]);

  useEffect(() => {
    getUserFromCookie();
    setLoading(false);
  }, []);

  useEffect(() => {
    handleSessionExpired();

    window.addEventListener("session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("session-expired", handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        // isAuthenticated,
        login,
        logout,
        loading,
        user,
      }}
    >
      {loading || isModalOpen ? <LoginModal /> : <div>{children}</div>}
    </AuthContext.Provider>
  );
};
