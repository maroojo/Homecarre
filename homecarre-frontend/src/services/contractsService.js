import useApi from "@/hooks/useApi";

const ContractsService = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL_DEV;
  const { api } = useApi();

  const getContracts = async () => {
    try {
      const response = await api(`${endpoint}/contracts`, "GET");
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const getContract = async (keyword, dateRange) => {
    try {
      const response = await api(`${endpoint}/contracts/`, "post", {
        keyword,
        dateRange,
      });
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  return { getContracts, getContract };
};

export default ContractsService;
