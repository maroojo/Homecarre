import api from "@/util/api";

const getContract = async (id) => {
  try {
    const response = await api(`/admin/contract?hc_no=${id}`, "GET");
    return response;
  } catch (error) {
    console.error("Error setting favorite:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default getContract;
