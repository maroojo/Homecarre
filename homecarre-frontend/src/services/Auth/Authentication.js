import api from "@/util/api";

const Authentication = async (user_id) => {
  try {
    const response = await api(`/admin/checkuser`, "POST", {
      user_id,
    });
    return response;
  } catch (error) {
    console.error("Check User error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default Authentication;
