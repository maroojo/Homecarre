"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { hcAuthentication } from "@homecarre-api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const { authentication } = hcAuthentication;
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await authentication();
      if (res) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
