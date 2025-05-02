import api from "@/util/api";

const LogInService = async (user, password) => {
  try {
    // const response = await api(
    //   `https://accomasia.co.th/homecare/adminlogin`,
    //   "POST",
    //   {
    //     user,
    //     password,
    //   }
    // );
    const response = await api(
      `/api/login`, 
      "POST",
      {
        user,
        password,
      }
    );
    console.log("login ", response);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};
export default LogInService;
