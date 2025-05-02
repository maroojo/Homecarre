import api from "@/util/api";
import { destroyCookie } from "nookies";

const LogOutService = async () => {
  try {
    const response = await api(
      `https://accomasia.co.th/homecare/logout`,
      "GET"
    );
    if (response) {
      destroyCookie(null, "user_id");
      destroyCookie(null, "laravel_session");
    }
    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};
export default LogOutService;
