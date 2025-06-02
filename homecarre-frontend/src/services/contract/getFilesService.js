import api from "@/util/api";

const getFilesService = async (id) => {
  try {
    const response = await api(`/admin/document/${id}`,"GET")
    return response
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default getFilesService;
