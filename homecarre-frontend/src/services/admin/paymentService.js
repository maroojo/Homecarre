import useApi from "@/hooks/useApi";

const PaymentService = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  const { api } = useApi();

  const getPayment = async (keyword, dateRange, page = 1, pagesize = 10) => {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;
    try {
      const response = await api(
        (() => {
          let url = `${endpoint}/p/getpayment?page=${page}&pagesize=${pagesize}`;
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

  return { getPayment };
};
export default PaymentService;
