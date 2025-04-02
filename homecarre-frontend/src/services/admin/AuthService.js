import useApi from "@/hooks/useApi";
import { useAuth } from "@/context/AuthContext";

const AdminService = () => {
  const endpoint = process.env.NEXT_PUBLIC_API_URL;
  const { api } = useApi();
  const { login, logout } = useAuth();

  const islogin = async (user, password) => {
    try {
      const response = await api(`https://accomasia.co.th/homecare/adminlogin`, "POST", {
        user,
        password,
      });
      if (response) {
        login(response.token, response.user_id, response.user_name, response.user_fullname, response.user_auth);
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
      const response = await api(`https://accomasia.co.th/homecare/adminlogout`, "POST");
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
        { user_id }
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
