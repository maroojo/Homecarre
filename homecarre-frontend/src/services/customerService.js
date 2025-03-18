import useApi from "@/hooks/useApi";

const CustomerService = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL_DEV;
  const { api } = useApi();

  const getCustomers = async () => {
    try {
      const response = await api(`${endpoint}/customers`, "GET");
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };
  return { getCustomers };
};
export default CustomerService;
