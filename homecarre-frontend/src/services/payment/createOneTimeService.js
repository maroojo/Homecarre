import api from "@/util/api";

const createOneTimeService = async (data) => {
  try {
    const response = await api(`/admin/payment/create-one-time`, "POST", data);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default createOneTimeService;
