import api from "@/util/api";

const getTypePaymentService = async () => {
  try {
    const response = await api(`/admin/payment-types`, "GET");
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default getTypePaymentService;
