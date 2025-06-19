import api from "@/util/api";
import { handleApiResponse } from "@/util/handleApiResponse";
import dayjs from "dayjs";

const requestService = () => {
  const getRepairs = async ({
    keyword,
    dateRange,
    page = 1,
    pagesize = 10,
    hc_no = null,
    status = null,
    sortBy = "payment_no",
    sortOrder = "DESC",
  }) => {
    const startDate = dateRange?.[0]
      ? dayjs(dateRange[0]).format("YYYY-MM-DD")
      : null;
    const endDate = dateRange?.[1]
      ? dayjs(dateRange[1]).format("YYYY-MM-DD")
      : null;

    const endpoint = (() => {
      let url = `/r/getrepair?page=${page}&pagesize=${pagesize}`;
      if (keyword) url += `&txtsearch=${keyword}`;
      if (startDate) url += `&start_date=${startDate}`;
      if (endDate) url += `&end_date=${endDate}`;
      if (hc_no) url += `&hc_no=${hc_no}`;
      return url;
    })();
    const response = await handleApiResponse(api(endpoint, "GET"));
    return response;
  };

  const updateRepairStatus = async (request_no, status) => {
    const response = await handleApiResponse(
      api("/admin/repair-request/update-status", "POST", {
        request_no: request_no,
        status: status,
      }),
      true
    );
    return response;
  };

  const getRequestStatus = async () => {
    const response = await handleApiResponse(
      api("/admin/request/statuses", "GET")
    );
    return response.data;
  };

  const updateRequestStatus = async (request_no, status) => {
    const response = await handleApiResponse(
      api("/admin/request/change-status", "POST", {
        repair_no: request_no,
        status,
      }),
      true
    );
    return response;
  };

  return {
    getRepairs,
    updateRepairStatus,
    getRequestStatus,
    updateRequestStatus,
  };
};
export default requestService;
