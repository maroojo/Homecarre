import dayjs from "dayjs";

import useApi from "@/hooks/useApi";

const ContractsService = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  const { api } = useApi();

  const getContracts = async (page = 1, pageSize = 10) => {
    try {
      const response = await api(
        `${endpoint}/h/gethomecarre?page=${page}&pagesize=${pageSize}`,
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const getContractById = async (id) => {
    try {
      const response = await api(
        `${endpoint}/h/gethomecarredetail?hc_no=${id}`,
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const getContract = async (keyword, dateRange, page = 1, pageSize = 10) => {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;
    try {
      const response = await api(
        (() => {
          let url = `${endpoint}/h/gethomecarre?page=${page}&pagesize=${pageSize}`;
          if (keyword) url += `&txtsearch=${keyword}`;
          if (startDate) url += `&start_date=${startDate}`;
          if (endDate) url += `&end_date=${endDate}`;
          return url;
        })(),
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const updateContract = async (data) => {
    try {
      const response = await api(
        `${endpoint}/h/updatehomecarre`,
        "POST",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return { isSuccess: response.status === 200 };
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  return { getContracts, getContract, getContractById, updateContract };
};

export default ContractsService;
