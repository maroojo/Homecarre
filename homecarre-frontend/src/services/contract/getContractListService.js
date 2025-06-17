import api from "@/util/api";
import dayjs from "dayjs";

const getContracts = async (page = 1, pageSize = 10, keyword, dateRange) => {
  try {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;
    const response = await api(
      (() => {
        let url = `/admin/contracts?page=${page}&pagesize=${pageSize}`;
        if (keyword) url += `&search=${keyword}`;
        if (startDate) url += `&start_date=${startDate}`;
        if (endDate) url += `&end_date=${endDate}`;
        return url;
      })(),
      "GET"
    );
    return response.data;
  } catch (error) {
    console.error("Error setting favorite:", error);
    return { isSuccess: false, message: "เกิดข้อผิดพลาด", result: [] };
  }
};

export default getContracts;
