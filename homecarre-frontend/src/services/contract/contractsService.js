import dayjs from "dayjs";
import { handleApiResponse } from "@/util/handleApiResponse";
import api from "@/util/api";

const ContractsService = () => {
  const getContracts = async (page = 1, pageSize = 10) => {
    try {
      const response = await api(
        `/h/gethomecarre?page=${page}&pagesize=${pageSize}`,
        "GET"
      );
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const getContractById = async (id) => {
    try {
      const response = await api(`/h/gethomecarredetail?hc_no=${id}`, "GET");
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const getContract = async (keyword, dateRange, page = 1, pageSize = 10) => {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;
    try {
      const response = await api(
        (() => {
          let url = `/h/gethomecarre?page=${page}&pagesize=${pageSize}`;
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

  const createContract = async (data) => {
    try {
      const response = await api(`/h/inserthomecarre`, "POST", data);
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const propertyCode = async () => {
    try {
      const response = await api(`/h/getpropertylist`, "GET");
      return response;
    } catch (error) {
      console.error("Error setting favorite:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  const uploadFile = async (params) => {
    const { hc_no, file, typeFile } = params;
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api(
        `/api/admin/contract/document/${hc_no}`,
        "POST",
        { document: formData, typefile: typeFile },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error uploading file:", error);
      return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
    }
  };

  return {
    getContracts,
    getContract,
    getContractById,
    createContract,
    propertyCode,
    uploadFile,
  };
};

export default ContractsService;
