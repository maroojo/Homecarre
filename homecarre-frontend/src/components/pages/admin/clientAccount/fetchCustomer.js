import { useEffect, useState } from "react";
import CustomerService from "@/services/customerService";

const useApiCustomer = () => {
  const { getCustomers } = CustomerService();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiCustomer = async () => {
    setLoading(true);
    try {
      const response = await getCustomers();
      if (response) {
        setData(response);
      }
    } catch (error) {
      console.error("Error fetching customer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading };
}

export default useApiCustomer;