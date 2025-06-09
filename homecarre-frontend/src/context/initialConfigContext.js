// contexts/StatusContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { hcRequest } from "@homecarre-api";

const StatusContext = createContext();

export const StatusProvider = ({ children }) => {
  const { getRequestStatus } = hcRequest();
  const [statusRequest, setStatusRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  const STATUS_KEY = "statusR";
  const STATUS_TIMESTAMP_KEY = "statusConfigTimestamp";
  const ONE_HOUR = 60 * 60 * 1000;

  const loadStatusConfig = async () => {
    setLoading(true);
    try {
      const response = await getRequestStatus();
      if (response.isSuccess && Array.isArray(response.data)) {
        localStorage.setItem(STATUS_KEY, JSON.stringify(response.data));
        localStorage.setItem(STATUS_TIMESTAMP_KEY, Date.now().toString());
        setStatusRequest(response.data);
      }
    } catch (err) {
      console.error("Failed to load status config:", err);
    } finally {
      setLoading(false);
    }
  };

  const clearStatusConfig = () => {
    localStorage.removeItem(STATUS_KEY);
    localStorage.removeItem(STATUS_TIMESTAMP_KEY);
    setStatusRequest([]);
  };

  useEffect(() => {
    const saved = localStorage.getItem(STATUS_KEY);
    const timestamp = localStorage.getItem(STATUS_TIMESTAMP_KEY);

    const isExpired =
      !timestamp || Date.now() - parseInt(timestamp, 10) > ONE_HOUR;

    if (!saved || isExpired) {
      loadStatusConfig();
    } else {
      setStatusRequest(JSON.parse(saved));
      setLoading(false);
    }
  }, []);

  return (
    <StatusContext.Provider
      value={{
        statusRequest,
        loading,
        refresh: loadStatusConfig,
        clear: clearStatusConfig,
      }}
    >
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
