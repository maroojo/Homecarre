import api from "@/util/api";

const uploadFilesService = async (file, HcNo) => {
  try {
    const formData = new FormData();
    formData.append("files", file);
    formData.append("hc_no", HcNo);
    const response = await api(`/admin/document/upload`, "POST", formData);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default uploadFilesService;
