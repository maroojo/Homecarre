"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const LoginModal = dynamic(() => import("@modules/loginModal/LoginModal"), {
  ssr: false,
});
import { hcAuthentication } from "@homecarre-api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { loginService, logoutService } = hcAuthentication;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userFromStorage = () => {
    try {
      const data = localStorage.getItem("userdata");
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error parsing cookie:", error);
      return null;
    }
  };

  const handleSessionExpired = () => {
    localStorage.removeItem("userdata");
    setUser(null);
    setIsModalOpen(true);
  };

  const login = async (body) => {
    try {
      const response = await loginService(body);
      if (response?.isSuccess) {
        localStorage.setItem("userdata", JSON.stringify(response.data));

        setUser(response.data);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setIsModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutService();
    } catch (err) {
      console.error("Error logging out:", err);
    } finally {
      localStorage.removeItem("userdata");
      setUser(null);
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const userData = userFromStorage();
    if (userData) {
      setUser(userData);
      setIsModalOpen(false);
    } else {
      setUser(null);
      setIsModalOpen(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // handleSessionExpired();

    window.addEventListener("session-expired", handleSessionExpired);
    return () =>
      window.removeEventListener("session-expired", handleSessionExpired);
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
