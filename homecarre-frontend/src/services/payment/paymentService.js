import api from "@/util/api";

const PaymentService = () => {
  const getPayment = async ({
    keyword,
    dateRange,
    page = 1,
    pagesize = 10,
    hc_no = null,
    status = null,
    sortBy = "payment_no",
    sortOrder = "DESC"
  }) => {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;
    try {
      const response = await api(
        (() => {
          let url = `/admin/payments?page=${page}&pagesize=${pagesize}`;
          if (keyword) url += `&q=${keyword}`;
          if (startDate) url += `&from=${startDate}`;
          if (endDate) url += `&to=${endDate}`;
          if (hc_no) url += `&hc_no=${hc_no}`;
          return url;
        })(),
        "GET"
      );
      return response.data;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const getPaymentStatus = async () => {
    try {
      const response = await api("/admin/payment-statuses", "GET");
      return response.data;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const updatePaymentStatus = async (id, status) => {
    try {
      const response = await api(`/admin/payment-update`, "POST", {
        payment_id: id,
        action: status,
      });
      return response.data;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  return { getPayment, getPaymentStatus, updatePaymentStatus };
};
export default PaymentService;
