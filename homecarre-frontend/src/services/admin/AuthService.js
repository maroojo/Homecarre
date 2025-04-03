import useApi from "@/hooks/useApi";
import { parseCookies, destroyCookie } from "nookies";

const AdminService = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  const { api } = useApi();

  const islogin = async (user, password, login) => {
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
        login(
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

  const islogout = async () => {
    try {
      const cookies = parseCookies();
      const token = cookies.token;
      console.log("toekn", token);
      const response = await api(
        `https://accomasia.co.th/homecare/logout`,
        "GET",
        {
          Authorization: `Bearer ${token}`,
        }
      );
      console.log("Logout response:", response);
      if (response) {
        logout();
      }
      return response;
    } catch (error) {
      console.error("Logout error:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const checkUser = async (user_id) => {
    try {
      const response = await api(
        `${endpoint}/admin/checkuser`,
        "POST",
        {
          user_id,
        },
        {
          Authorization: `Bearer ${token}`,  
        }
      );
      return response;
    } catch (error) {
      console.error("Check User error:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  return { islogin, islogout, checkUser };
};

export default AdminService;
