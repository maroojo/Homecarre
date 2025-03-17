"use client";

import { useEffect, useState } from "react";
import ContractsService from "@/services/contractsService";

const useApiContracts = () => {
  const { getContracts } = ContractsService();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiContracts = async () => {
    setLoading(true);
    try {
      const response = await getContracts();
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error("Error fetching contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiContracts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
};

export default useApiContracts;
