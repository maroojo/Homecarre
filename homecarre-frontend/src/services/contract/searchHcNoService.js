import api from "@/util/api";

const searchHcNoService = async (data) => {
  try {
    const response = await api(`/admin/contract/search-hc?q=${data}`, "GET");
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default searchHcNoService;
