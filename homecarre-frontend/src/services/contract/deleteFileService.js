import api from "@/util/api";

const deleteFileService = async (data) => {
  try {
    const response = await api(`/admin/document/file`, "POST", {
      hc_no: data.hcNo,
      namefile: data.file,
    });
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default deleteFileService;
