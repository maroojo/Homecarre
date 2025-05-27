import api from "@/util/api";

const LogInService = async (body) => {
  try {
    const response = await api(`/admin/auth/login`, "POST", body);
    console.log("login response", response);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};
export default LogInService;
