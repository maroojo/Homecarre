import useApi from "@/hooks/useApi";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const AdminService = (loginCallback, logoutCallback) => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  const { api } = useApi();

  const Login = async (user, password) => {
    try {
      const response = await api(
        `https://accomasia.co.th/homecare/adminlogin`,
        "POST",
        {
          user,
          password,
        }
      );
      if (response) {
        setCookie(null, "user_id", response.user_id, { path: "/" });
        loginCallback(
          response.token,
          response.user_id,
          response.user_name,
          response.user_fullname,
          response.user_auth
        );
      }
      console.log("login ", response);
      return response;
    } catch (error) {
      console.error("Login error:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const Logout = async () => {
    try {
      const response = await api(
        `https://accomasia.co.th/homecare/logout`,
        "GET"
      );
      console.log("Logout response:", response);
      if (response) {
        destroyCookie(null, "user_id");
        destroyCookie(null, "laravel_session");
        logoutCallback();
      }
      return response;
    } catch (error) {
      console.error("Logout error:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const checkUser = async (user_id) => {
    try {
      const response = await api(`${endpoint}/admin/checkuser`, "POST", {
        user_id,
      });
      return response;
    } catch (error) {
      console.error("Check User error:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  return { Login, Logout, checkUser };
};

export default AdminService;
