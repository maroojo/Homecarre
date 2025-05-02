import api from "@/util/api";

const ClientService = () => {
  const getClients = async (page = 1, pageSize = 10) => {
    try {
      const response = await api(
        `/a/getclient?page=${page}&pagesize=${pageSize}`,
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const getClient = async (keyword, dateRange, page = 1, pageSize = 10) => {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;
    try {
      const response = await api(
        (() => {
          let url = `/a/getclient?page=${page}&pagesize=${pageSize}`;
          if (keyword) url += `&txtsearch=${keyword}`;
          if (startDate) url += `&start_date=${startDate}`;
          if (endDate) url += `&end_date=${endDate}`;
          return url;
        })(),
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const updateClient = async (clientData) => {
    try {
      const response = await api(`a/updateclient`, "POST", {
        client_code: clientData.client_code,
        client_type: clientData.client_type,
        fullname: clientData.fullname,
        client_phone: clientData.client_phone,
      });
      return response;
    } catch (error) {
      console.error("Error updating client:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const insertClient = async (clientData) => {
    try {
      const response = await api(`/a/insertclient`, "POST", {
        fullname: clientData.fullname,
        client_phone: clientData.client_phone,
        client_type: clientData.client_type,
        email: clientData.email || "",
      });
      return response;
    } catch (error) {
      console.error("Error inserting client:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };
  return { getClients, getClient, updateClient, insertClient };
};
export default ClientService;
