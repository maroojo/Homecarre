import api from "@/util/api";

const createContractService = async (data) => {
  try {
    function cleanUndefined(obj) {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== undefined) acc[key] = value;
        return acc;
      }, {});
    }

    data.clients = data.clients.map((client) => cleanUndefined(client));
    console.log("data", data);
    const response = await api(`/admin/contract/create`, "POST", data);
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default createContractService;
