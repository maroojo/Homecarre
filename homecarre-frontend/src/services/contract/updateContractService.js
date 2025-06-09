import api from "@/util/api";

const updateContractService = async (data) => {
    try {
      const response = await api(`/admin/contract/update`, "POST", data);
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
};

export default updateContractService;
